import React from "react";
import { IoAddCircle } from "react-icons/io5";

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-custom-red text-white p-4 rounded-full shadow-lg hover:bg-custom-coral transition"
    >
      <IoAddCircle size={24} />
    </button>
  );
};

export default FloatingActionButton;
