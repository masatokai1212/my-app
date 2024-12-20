import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`px-4 py-2 border rounded ${className}`}
      {...props}
    />
  );
};

export default Input;