import React, { useState } from "react";
import axios from "axios";
import Snackbar from "../components/Snackbar";

const Register = () => {
    const initialFormData = {
        tipo_documento: "",
        numero_documento: "",
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        password_confirmation: "",
        direccion: "",
        fecha_nacimiento: "",
        biografia: "",
        preferencia_comunicacion: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        message: "",
        type: "",
        icon: null,
        isVisible: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                formData
            );
            setSnackbar({
                message: "Your account has been created! 🚀",
                type: "success",
                icon: (
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,
                        8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 
                        4.31L15.77,2.74C14.61,2.26 13.34,2 
                        12,2A10,10 0 0,0 2,12A10,10 0 0,0 
                        12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,
                        16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
                        ></path>
                    </svg>
                ),
                isVisible: true,
            });
            setFormData(initialFormData); // Resetear el formulario
            setErrors({}); // Limpiar errores
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                setSnackbar({
                    message: "There was an error with your submission.",
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
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <path d="M18 6L6 18"></path>
                            <path d="M6 6l12 12"></path>
                        </svg>
                    ),
                    isVisible: true,
                });
            } else {
                console.error(
                    "Registration error:",
                    error.response ? error.response.data : error.message
                );
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-4xl"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Registro
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="tipo_documento"
                            className="block text-gray-700"
                        >
                            Tipo Documento:
                        </label>
                        <input
                            type="text"
                            id="tipo_documento"
                            name="tipo_documento"
                            value={formData.tipo_documento}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="off"
                        />
                        {errors.tipo_documento && (
                            <span className="text-red-500">
                                {errors.tipo_documento[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="numero_documento"
                            className="block text-gray-700"
                        >
                            Número Documento:
                        </label>
                        <input
                            type="text"
                            id="numero_documento"
                            name="numero_documento"
                            value={formData.numero_documento}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="off"
                        />
                        {errors.numero_documento && (
                            <span className="text-red-500">
                                {errors.numero_documento[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="nombre" className="block text-gray-700">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="given-name"
                        />
                        {errors.nombre && (
                            <span className="text-red-500">
                                {errors.nombre[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="apellido"
                            className="block text-gray-700"
                        >
                            Apellido:
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="family-name"
                        />
                        {errors.apellido && (
                            <span className="text-red-500">
                                {errors.apellido[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="email"
                        />
                        {errors.email && (
                            <span className="text-red-500">
                                {errors.email[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="new-password"
                        />
                        {errors.password && (
                            <span className="text-red-500">
                                {errors.password[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-gray-700"
                        >
                            Confirmar Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="new-password"
                        />
                        {errors.password_confirmation && (
                            <span className="text-red-500">
                                {errors.password_confirmation[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="direccion"
                            className="block text-gray-700"
                        >
                            Dirección:
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="street-address"
                        />
                        {errors.direccion && (
                            <span className="text-red-500">
                                {errors.direccion[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="fecha_nacimiento"
                            className="block text-gray-700"
                        >
                            Fecha de Nacimiento:
                        </label>
                        <input
                            type="date"
                            id="fecha_nacimiento"
                            name="fecha_nacimiento"
                            value={formData.fecha_nacimiento}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="bday"
                        />
                        {errors.fecha_nacimiento && (
                            <span className="text-red-500">
                                {errors.fecha_nacimiento[0]}
                            </span>
                        )}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label
                            htmlFor="biografia"
                            className="block text-gray-700"
                        >
                            Biografía:
                        </label>
                        <textarea
                            id="biografia"
                            name="biografia"
                            value={formData.biografia}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="off"
                        ></textarea>
                        {errors.biografia && (
                            <span className="text-red-500">
                                {errors.biografia[0]}
                            </span>
                        )}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label
                            htmlFor="preferencia_comunicacion"
                            className="block text-gray-700"
                        >
                            Preferencia de Comunicación:
                        </label>
                        <select
                            id="preferencia_comunicacion"
                            name="preferencia_comunicacion"
                            value={formData.preferencia_comunicacion}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="Email">Email</option>
                            <option value="Telefono">Teléfono</option>
                            <option value="SMS">SMS</option>
                        </select>
                        {errors.preferencia_comunicacion && (
                            <span className="text-red-500">
                                {errors.preferencia_comunicacion[0]}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                    Registrar
                </button>
            </form>
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

export default Register;
