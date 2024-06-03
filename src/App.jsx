import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import PropTypes from 'prop-types';
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HerramientasList from "./pages/HerramientasList";
import HerramientaDetalle from "./pages/HerramientaDetalle";
import CreateTool from "./pages/CreateTool";
import Sidebar from "./components/Sidebar";

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired
};

const App = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-grow ml-64">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/create-tool" element={<PrivateRoute element={CreateTool} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/herramientas" element={<PrivateRoute element={HerramientasList} />} />
                        <Route path="/herramientas/:id" element={<PrivateRoute element={HerramientaDetalle} />} />
                        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
