// src/components/InfoModal.jsx
import PropTypes from "prop-types";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Información y Ayuda</h2>
        <p className="mb-4">
          Aquí puedes encontrar información útil y respuestas a preguntas
          frecuentes.
        </p>
        <ul className="list-disc list-inside">
          <li>¿Cómo agregar una nueva herramienta?</li>
          <li>¿Cómo asignar una herramienta?</li>
          <li>¿Cómo actualizar el estado de una herramienta?</li>
          <li>¿Qué hacer si una herramienta se pierde?</li>
        </ul>
      </div>
    </div>
  );
};

InfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoModal;
