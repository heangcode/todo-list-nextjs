import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`p-2 rounded ${className}`}>
    {children}
  </button>
);

export { Button };
