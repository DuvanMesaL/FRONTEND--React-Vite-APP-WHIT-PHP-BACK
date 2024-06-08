// src/components/SelectField.jsx
import PropTypes from "prop-types";

const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  options,
  required,
}) => (
  <div>
    <label htmlFor={id} className="block text-gray-700">
      {label}:
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
      required={required}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500">{error[0]}</span>}
  </div>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};

export default SelectField;
