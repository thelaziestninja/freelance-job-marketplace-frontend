import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="lds-default flex justify-center items-center h-screen">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className={`bg-purple-500 ${getDelayClass(index)}`} />
      ))}
    </div>
  );
};

const getDelayClass = (index: number) => {
  const delay = index * -0.1;
  return `animation-delay[${delay}s]`;
};

export default LoadingSpinner;
