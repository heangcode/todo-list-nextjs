import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onKeyDown,
  className,
  placeholder,
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    className={`px-4 py-2 border rounded ${className}`}
  />
);

export { Input };
