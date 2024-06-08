// src/components/SearchSidebar.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const SearchSidebar = ({
  isOpen,
  onClose,
  onSearch,
  filters,
  onFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState(
    filters.reduce((acc, filter) => ({ ...acc, [filter.name]: "" }), {})
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (name) => (e) => {
    const newFilterState = { ...filterState, [name]: e.target.value };
    setFilterState(newFilterState);
    onFilterChange(newFilterState);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        onClick={onClose}
      >
        &times;
      </button>
      <h2 className="text-lg font-bold mb-4">Buscar y Filtrar</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Buscar:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {filters.map((filter) => (
        <div className="mb-4" key={filter.name}>
          <label className="block text-gray-700 mb-2">{filter.label}:</label>
          <select
            value={filterState[filter.name]}
            onChange={handleFilterChange(filter.name)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

SearchSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default SearchSidebar;
