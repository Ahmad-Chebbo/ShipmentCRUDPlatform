import React from 'react';

const Input = ({ label, type, placeholder, reference }) => {
  return (
    <div className="form-group">
      <label className="block font-medium mb-2">{label}</label>
      <input type={type} className="form-control w-full mb-3" ref={reference} placeholder={placeholder} />
    </div>
  );
};

export default Input;
