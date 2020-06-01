import React from "react";
import "./Button.css";

const Button = ({ value, type, handleclick }) => {
  return (
    <button className="Button" onClick={() => handleclick(value, type)}>
      {value}
    </button>
  );
};

export default Button;
