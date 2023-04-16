import React from "react";

export const Input = ({
  label,
  type,
  name,
  value,
  autoComplete,
  required,
  placeholder,
  onChange,
  maxLength = "",
  msg = ""
}) => {
  return (
    <>
      <label htmlFor={name} className="col-span-3">
        {label}
      </label>
      <div className="w-full col-span-9">
      <input
        id={name}
        name={name}
        type={type}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
        value={value}
        className="gap-3 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500"
        placeholder={placeholder}
      />
      <p className="text-xs text-red">{msg}</p>
      </div>
    </>
  );
};
