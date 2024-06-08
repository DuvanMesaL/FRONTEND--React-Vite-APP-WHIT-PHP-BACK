// src/components/TextAreaField.jsx
import PropTypes from "prop-types";

const TextAreaField = ({ label, id, name, value, onChange, error }) => (
  <div className="md:col-span-2">
    <label htmlFor={id} className="block text-gray-700">
      {label}:
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
      autoComplete="off"
    ></textarea>
    {error && <span className="text-red-500">{error[0]}</span>}
  </div>
);

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default TextAreaField;
