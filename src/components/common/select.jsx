import React from "react";

const Select = ({ name, label, items, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="custom-select">
        <option value='' />
        {items.map(item => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
