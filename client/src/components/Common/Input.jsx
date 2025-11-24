import React from 'react';

const Input = ({ label, type = "text", placeholder, register, name, errors, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${label || name} is required` })}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors?.[name] ? 'border-red-500' : ''}`}
        {...props}
      />
      {errors?.[name] && <p className="text-red-500 text-xs italic mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default Input;