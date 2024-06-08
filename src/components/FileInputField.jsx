// src/components/FileInputField.jsx
import PropTypes from "prop-types";

const FileInputField = ({ label, id, name, onChange, error }) => (
  <div className="md:col-span-2">
    <label htmlFor={id} className="block text-gray-700">
      {label}:
    </label>
    <input
      type="file"
      id={id}
      name={name}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
    />
    {error && <span className="text-red-500">{error[0]}</span>}
  </div>
);

FileInputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default FileInputField;
