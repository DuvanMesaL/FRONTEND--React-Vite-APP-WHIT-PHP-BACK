// src/routes/PrivateRoutes.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Dashboard from "../pages/Dashboard";
import HerramientasList from "../pages/HerramientasList";
import CreateTool from "../pages/CreateTool";
import Sidebar from "../components/Sidebar";
import Logout from "../components/Logout";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

const PrivateRoutes = () => {
  return (
    <div className="flex bg-primary-bg">
      <Sidebar />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} />}
          />
          <Route
            path="/create-tool"
            element={<PrivateRoute element={CreateTool} />}
          />
          <Route
            path="/herramientas"
            element={<PrivateRoute element={HerramientasList} />}
          />
          <Route path="/logout" element={<PrivateRoute element={Logout} />} />
          {/* Añade más rutas protegidas según sea necesario */}
        </Routes>
      </div>
    </div>
  );
};

export default PrivateRoutes;
