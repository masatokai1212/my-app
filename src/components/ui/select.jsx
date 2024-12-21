import React from "react";

const Select = ({ children, className, ...props }) => {
  return (
    <select className={`px-4 py-2 rounded ${className}`} {...props}>
      {children}
    </select>
  );
};

const SelectTrigger = ({ children, className, ...props }) => {
  return (
    <div className={`select-trigger ${className}`} {...props}>
      {children}
    </div>
  );
};

const SelectContent = ({ children, className, ...props }) => {
  return (
    <div className={`select-content ${className}`} {...props}>
      {children}
    </div>
  );
};

const SelectItem = ({ children, value, className, ...props }) => {
  return (
    <option value={value} className={className} {...props}>
      {children}
    </option>
  );
};

const SelectValue = ({ children, className, ...props }) => {
  return (
    <div className={`select-value ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };