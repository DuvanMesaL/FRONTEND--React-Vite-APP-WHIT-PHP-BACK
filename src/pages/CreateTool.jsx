// src/pages/CreateTool.jsx
import { useState } from "react";
import axios from "axios";
import Snackbar from "../components/Snackbar";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import SelectField from "../components/SelectField";
import FileInputField from "../components/FileInputField";

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
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      await axios.post("http://127.0.0.1:8000/api/herramientas", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSnackbar({
        message: "¡Herramienta creada exitosamente! 🚀",
        type: "success",
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
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
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
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
          <InputField
            label="Nombre"
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
            required
          />
          <TextAreaField
            label="Descripción"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            error={errors.descripcion}
          />
          <SelectField
            label="Estado"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            error={errors.estado}
            options={[
              "Disponible",
              "Asignada",
              "Perdida",
              "En Mantenimiento",
              "Eliminado",
            ]}
            required
          />
          <InputField
            label="Categoría"
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            error={errors.categoria}
          />
          <InputField
            label="Fecha de Adquisición"
            type="date"
            id="fecha_adquisicion"
            name="fecha_adquisicion"
            value={formData.fecha_adquisicion}
            onChange={handleChange}
            error={errors.fecha_adquisicion}
          />
          <InputField
            label="Último Mantenimiento"
            type="date"
            id="ultimo_mantenimiento"
            name="ultimo_mantenimiento"
            value={formData.ultimo_mantenimiento}
            onChange={handleChange}
            error={errors.ultimo_mantenimiento}
          />
          <InputField
            label="Ubicación Actual"
            type="text"
            id="ubicacion_actual"
            name="ubicacion_actual"
            value={formData.ubicacion_actual}
            onChange={handleChange}
            error={errors.ubicacion_actual}
          />
          <InputField
            label="Código de Herramienta"
            type="text"
            id="codigo_herramienta"
            name="codigo_herramienta"
            value={formData.codigo_herramienta}
            onChange={handleChange}
            error={errors.codigo_herramienta}
            required
            pattern="\d*"
            maxLength="10"
          />
          <FileInputField
            label="Foto"
            id="foto_url"
            name="foto_url"
            onChange={handleChange}
            error={errors.foto_url}
          />
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
