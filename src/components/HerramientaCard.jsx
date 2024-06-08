// src/components/HerramientaCard.jsx
import PropTypes from "prop-types";
import {
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useState } from "react";

const HerramientaCard = ({ herramienta, expanded, toggleExpand }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    toggleExpand(herramienta.id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl w-full max-w-lg mx-auto">
      <div className="flex flex-col md:flex-row items-center p-4 bg-gray-50">
        <img
          src={`http://127.0.0.1:8000/storage/${herramienta.foto_url}`}
          alt={herramienta.nombre}
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-2 border-gray-200 mb-4 md:mb-0 mr-0 md:mr-4"
        />
        <div className="flex flex-col justify-between flex-grow text-center md:text-left">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 break-words w-full">
            {herramienta.nombre}
          </h2>
          <p className="text-sm text-gray-600 break-words w-full">
            {herramienta.marca}
          </p>
          <p className="text-sm text-gray-600 break-words w-full">
            {herramienta.categoria}
          </p>
          <span className="flex justify-center md:justify-start items-center mt-2">
            {herramienta.estado === "Disponible" ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <FaTimesCircle className="text-red-500 mr-2" />
            )}
            <span
              className={`font-semibold ${
                herramienta.estado === "Disponible"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {herramienta.estado}
            </span>
          </span>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 max-h-40 overflow-y-auto">
          <p className="text-gray-600 mb-2">{herramienta.descripcion}</p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Fecha de Adquisición:</span>{" "}
            {herramienta.fecha_adquisicion}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Último Mantenimiento:</span>{" "}
            {herramienta.ultimo_mantenimiento}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Ubicación Actual:</span>{" "}
            {herramienta.ubicacion_actual}
          </p>
        </div>
      )}
      <div className="p-4 flex justify-between items-center border-t border-gray-200 bg-gray-50">
        <button
          onClick={handleToggle}
          className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {isExpanded ? (
            <>
              <FaChevronUp className="mr-2" />
              Show less
            </>
          ) : (
            <>
              <FaChevronDown className="mr-2" />
              View more...
            </>
          )}
        </button>
      </div>
    </div>
  );
};

HerramientaCard.propTypes = {
  herramienta: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    estado: PropTypes.string.isRequired,
    fecha_adquisicion: PropTypes.string,
    ultimo_mantenimiento: PropTypes.string,
    ubicacion_actual: PropTypes.string,
    foto_url: PropTypes.string,
    marca: PropTypes.string, // New field
    categoria: PropTypes.string, // New field
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default HerramientaCard;
