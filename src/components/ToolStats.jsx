// src/components/ToolStats.jsx
import React from "react";
import PropTypes from "prop-types";

const ToolStats = ({ stats }) => {
  return (
    <div className="flex gap-4 mb-4 text-sm text-gray-700">
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center">
          <span className="font-medium">{stat.label} </span> <br />
          <span className="text-teal-600">({stat.value})</span>
          {index < stats.length - 1 && (
            <span className="mx-2 text-gray-400">|</span>
          )}
        </div>
      ))}
    </div>
  );
};

ToolStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ToolStats;
