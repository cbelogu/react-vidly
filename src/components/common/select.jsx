import React from "react";

const Select = ({ name, label, onChange, items }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select onChange={onChange} name={name} id={name} className="custom-select">
        <option defaultValue />
        {items.map(item => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
