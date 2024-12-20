import React from "react";

// src/components/ui/button.jsx
import React from 'react';

export const Button = (props) => {
  return <button {...props}>{props.children}</button>;
};

export default Button;