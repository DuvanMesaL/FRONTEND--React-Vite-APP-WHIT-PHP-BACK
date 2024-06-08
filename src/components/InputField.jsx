// src/components/InputField.jsx
import PropTypes from "prop-types";

const InputField = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  error,
  required,
  pattern,
  maxLength,
}) => (
  <div>
    <label htmlFor={id} className="block text-gray-700">
      {label}:
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
      required={required}
      autoComplete="off"
      pattern={pattern}
      maxLength={maxLength}
    />
    {error && <span className="text-red-500">{error[0]}</span>}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  required: PropTypes.bool,
  pattern: PropTypes.string,
  maxLength: PropTypes.number,
};

export default InputField;
