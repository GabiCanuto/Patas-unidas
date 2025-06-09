// src/components/Button.jsx

import React from "react";
import "./Button.css";

const Button = ({ text, onClick, type = "button", disabled = false }) => {
  return (
    <button
      className="custom-button"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
