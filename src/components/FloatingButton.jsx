// src/components/FloatingButton.jsx
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const FloatingButton = ({ text, icon: Icon = FaPlus, to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="fixed bottom-8 right-8 md:bottom-12 md:right-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 md:p-5 shadow-lg flex items-center justify-center"
    >
      <Icon className="text-lg md:text-xl" />
      <span className="hidden sm:block ml-2">{text}</span>
    </button>
  );
};

FloatingButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  to: PropTypes.string.isRequired,
};

export default FloatingButton;
