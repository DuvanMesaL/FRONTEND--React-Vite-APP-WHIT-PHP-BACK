import { useState } from "react";

const Snackbar = ({ message, type, icon, isVisible, setIsVisible }) => {
    const getTypeClasses = () => {
        switch (type) {
            case "success":
                return "bg-green-600";
            case "error":
                return "bg-red-600";
            case "warning":
                return "bg-yellow-600";
            case "info":
                return "bg-blue-600";
            default:
                return "bg-gray-600";
        }
    };

    return (
        <div
            className={`${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            } fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 text-white rounded-lg shadow-lg transition-opacity duration-300 ease-in-out ${getTypeClasses()}`}
        >
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                    {icon && (
                        <span className="w-6 h-6" aria-hidden="true">
                            {icon}
                        </span>
                    )}
                    <p>{message}</p>
                </div>
                <button onClick={() => setIsVisible(false)}>
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
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        ></path>
                        <path d="M18 6L6 18"></path>
                        <path d="M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Snackbar;
