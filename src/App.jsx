import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTool from "./pages/CreateTool";
import Sidebar from "./components/Sidebar";

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-grow p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/create-tool"
                            element={<PrivateRoute element={CreateTool} />}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/dashboard"
                            element={<PrivateRoute element={Dashboard} />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
