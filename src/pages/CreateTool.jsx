import { useState } from "react";
import axios from "axios";
import Snackbar from "../components/Snackbar";

const CreateTool = () => {
    const initialFormData = {
        nombre: "",
        descripcion: "",
        estado: "Disponible",
        categoria: "",
        fecha_adquisicion: "",
        ultimo_mantenimiento: "",
        ubicacion_actual: "",
        codigo_herramienta: "",
        foto_url: null,
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
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const data = new FormData();

            for (const key in formData) {
                data.append(key, formData[key]);
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/api/herramientas",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setSnackbar({
                message: "¡Herramienta creada exitosamente! 🚀",
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

            setFormData(initialFormData);
            setErrors({});
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                setSnackbar({
                    message: "Hubo un error con tu envío.",
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
                    "Error al crear herramienta:",
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
                    Crear Herramienta
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="nombre" className="block text-gray-700">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="off"
                        />
                        {errors.nombre && (
                            <span className="text-red-500">
                                {errors.nombre[0]}
                            </span>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label
                            htmlFor="descripcion"
                            className="block text-gray-700"
                        >
                            Descripción:
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="off"
                        ></textarea>
                        {errors.descripcion && (
                            <span className="text-red-500">
                                {errors.descripcion[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="estado" className="block text-gray-700">
                            Estado:
                        </label>
                        <select
                            id="estado"
                            name="estado"
                            value={formData.estado || "Disponible"}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="Asignada">Asignada</option>
                            <option value="Perdida">Perdida</option>
                            <option value="En Mantenimiento">
                                En Mantenimiento
                            </option>
                            <option value="Eliminado">Eliminado</option>
                        </select>
                        {errors.estado && (
                            <span className="text-red-500">
                                {errors.estado[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="categoria"
                            className="block text-gray-700"
                        >
                            Categoría:
                        </label>
                        <input
                            type="text"
                            id="categoria"
                            name="categoria"
                            value={formData.categoria || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="off"
                        />
                        {errors.categoria && (
                            <span className="text-red-500">
                                {errors.categoria[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="fecha_adquisicion"
                            className="block text-gray-700"
                        >
                            Fecha de Adquisición:
                        </label>
                        <input
                            type="date"
                            id="fecha_adquisicion"
                            name="fecha_adquisicion"
                            value={formData.fecha_adquisicion || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="off"
                        />
                        {errors.fecha_adquisicion && (
                            <span className="text-red-500">
                                {errors.fecha_adquisicion[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="ultimo_mantenimiento"
                            className="block text-gray-700"
                        >
                            Último Mantenimiento:
                        </label>
                        <input
                            type="date"
                            id="ultimo_mantenimiento"
                            name="ultimo_mantenimiento"
                            value={formData.ultimo_mantenimiento || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="off"
                        />
                        {errors.ultimo_mantenimiento && (
                            <span className="text-red-500">
                                {errors.ultimo_mantenimiento[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="ubicacion_actual"
                            className="block text-gray-700"
                        >
                            Ubicación Actual:
                        </label>
                        <input
                            type="text"
                            id="ubicacion_actual"
                            name="ubicacion_actual"
                            value={formData.ubicacion_actual || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="off"
                        />
                        {errors.ubicacion_actual && (
                            <span className="text-red-500">
                                {errors.ubicacion_actual[0]}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="codigo_herramienta" className="block text-gray-700">
                            Código de Herramienta:
                        </label>
                        <input
                            type="text"
                            id="codigo_herramienta"
                            name="codigo_herramienta"
                            value={formData.codigo_herramienta || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                            autoComplete="off"
                            pattern="\d*"
                            maxLength="10"
                        />
                        {errors.codigo_herramienta && (
                            <span className="text-red-500">{errors.codigo_herramienta[0]}</span>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label
                            htmlFor="foto_url"
                            className="block text-gray-700"
                        >
                            Foto:
                        </label>
                        <input
                            type="file"
                            id="foto_url"
                            name="foto_url"
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            autoComplete="off"
                        />
                        {errors.foto_url && (
                            <span className="text-red-500">
                                {errors.foto_url[0]}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Crear Herramienta
                </button>
            </form>

            {snackbar.isVisible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    icon={snackbar.icon}
                    isVisible={snackbar.isVisible}
                    onClose={() => setSnackbar({ ...snackbar, isVisible: false })}
                />
            )}
        </div>
    );
};

export default CreateTool;
