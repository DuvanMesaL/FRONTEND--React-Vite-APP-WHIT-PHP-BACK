import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-800 text-white w-64">
            <div className="flex items-center justify-center h-20 shadow-md">
                <h1 className="text-3xl font-semibold">MyApp</h1>
            </div>
            <nav className="flex-grow mt-10">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/create-tool"
                            className="flex items-center px-6 py-2 hover:bg-gray-700"
                        >
                            Create Tool
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/register"
                            className="flex items-center px-6 py-2 hover:bg-gray-700"
                        >
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="flex items-center px-6 py-2 hover:bg-gray-700"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/logout"
                            className="flex items-center px-6 py-2 hover:bg-gray-700"
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
