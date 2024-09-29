import React from "react";

export const Dropdown = ({ label, options, value, onChange }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <select
      className="block w-full p-2 border border-gray-300 rounded-md"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);