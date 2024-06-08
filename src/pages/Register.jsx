// src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import Snackbar from "../components/Snackbar";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import SelectField from "../components/SelectField";
import FileInputField from "../components/FileInputField";

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
    big_foto_url: null,
    little_foto_url: null,
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
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      await axios.post("http://127.0.0.1:8000/api/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSnackbar({
        message: "Your account has been created! 🚀",
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
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
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
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Tipo Documento"
            type="text"
            id="tipo_documento"
            name="tipo_documento"
            value={formData.tipo_documento}
            onChange={handleChange}
            error={errors.tipo_documento}
            required
          />
          <InputField
            label="Número Documento"
            type="text"
            id="numero_documento"
            name="numero_documento"
            value={formData.numero_documento}
            onChange={handleChange}
            error={errors.numero_documento}
            required
          />
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
          <InputField
            label="Apellido"
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            error={errors.apellido}
            required
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <InputField
            label="Contraseña"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <InputField
            label="Confirmar Contraseña"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            error={errors.password_confirmation}
            required
          />
          <InputField
            label="Dirección"
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            error={errors.direccion}
          />
          <InputField
            label="Fecha de Nacimiento"
            type="date"
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            error={errors.fecha_nacimiento}
          />
          <TextAreaField
            label="Biografía"
            id="biografia"
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            error={errors.biografia}
          />
          <SelectField
            label="Preferencia de Comunicación"
            id="preferencia_comunicacion"
            name="preferencia_comunicacion"
            value={formData.preferencia_comunicacion}
            onChange={handleChange}
            error={errors.preferencia_comunicacion}
            options={["Email", "Telefono", "SMS"]}
          />
          <FileInputField
            label="Foto Grande"
            id="foto_grande"
            name="foto_grande"
            onChange={handleChange}
            error={errors.foto_grande}
          />
          <FileInputField
            label="Foto Pequeña"
            id="foto_pequena"
            name="foto_pequena"
            onChange={handleChange}
            error={errors.foto_pequena}
          />
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
