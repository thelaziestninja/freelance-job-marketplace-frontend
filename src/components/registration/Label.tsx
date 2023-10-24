import React from "react";

type LabelProps = {
  children: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ children }) => (
  <label className="block text-sm font-medium text-gray-600 mb-2">
    {children}
  </label>
);

export default Label;
