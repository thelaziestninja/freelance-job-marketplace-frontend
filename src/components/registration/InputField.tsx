import React from "react";

type InputFieldProps = {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className="p-2 w-full border rounded-md"
    placeholder={placeholder}
    autoComplete="off"
  />
);

export default InputField;
