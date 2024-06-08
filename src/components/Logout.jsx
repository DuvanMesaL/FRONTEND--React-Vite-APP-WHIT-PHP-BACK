// src/components/Logout.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Snackbar from "../components/Snackbar";

const Logout = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    icon: null,
    isVisible: false,
  });

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setSnackbar({
            message: "No estás logueado.",
            type: "error",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            ),
            isVisible: true,
          });
          setTimeout(() => navigate("/login"), 3000);
          return;
        }
        await axios.post(
          "http://127.0.0.1:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem("token");
        setSnackbar({
          message: "Has cerrado sesión exitosamente.",
          type: "success",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          ),
          isVisible: true,
        });
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setSnackbar({
          message: "Error al cerrar sesión. Inténtalo de nuevo.",
          type: "error",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          ),
          isVisible: true,
        });
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        icon={snackbar.icon}
        isVisible={snackbar.isVisible}
        setIsVisible={(isVisible) =>
          setSnackbar((prev) => ({ ...prev, isVisible }))
        }
      />
    </div>
  );
};

Logout.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.element,
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
};

export default Logout;
