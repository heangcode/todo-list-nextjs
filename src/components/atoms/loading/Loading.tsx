import React from "react";

interface LoadingProps {
  message?: string;
  className?: string;
  noText?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ message, className, noText }) => {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <div
        aria-label="Loading..."
        role="status"
        className="flex items-center flex-col space-y-2"
      >
        <svg
          className="animate-spin h-6 w-6 text-gray-400"
          viewBox="0 0 256 256"
        >
          <line
            x1="128"
            y1="32"
            x2="128"
            y2="64"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            stroke="currentColor"
          ></line>
          <line
            x1="195.9"
            y1="60.1"
            x2="173.3"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            stroke="currentColor"
          ></line>
          <line
            x1="224"
            y1="128"
            x2="192"
            y2="128"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            stroke="currentColor"
          ></line>
          <line
            x1="195.9"
            y1="195.9"
            x2="173.3"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            stroke="currentColor"
          ></line>
          <line
            x1="128"
            y1="224"
            x2="128"
            y2="192"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            stroke="currentColor"
          ></line>
          <line
            x1="60.1"
            y1="195.9"
            x2="82.7"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            stroke="currentColor"
          ></line>
          <line
            x1="32"
            y1="128"
            x2="64"
            y2="128"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            stroke="currentColor"
          ></line>
          <line
            x1="60.1"
            y1="60.1"
            x2="82.7"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            stroke="currentColor"
          ></line>
        </svg>
        {!noText && (
          <span className="ml-2 text-sm font-medium tracking-[1.5px] text-primary">
            {message || "Loading..."}
          </span>
        )}
      </div>
    </div>
  );
};

export { Loading };
