// src/components/TestConnection.jsx
import { useState } from "react";
import axiosInstance from "../api/axiosConfig";

const TestConnection = () => {
    const [message, setMessage] = useState("");

    const testConnection = async () => {
        try {
            const response = await axiosInstance.get("/test-connection");
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Connection failed");
        }
    };

    return (
        <div>
            <button onClick={testConnection}>Test Connection</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TestConnection;
