import React from "react";

const Button = ({ children, variant = "primary", ...props }) => (
    <button
        {...props}
        className={`mx-auto w-full px-4 py-2 flex items-center justify-center rounded-lg transition-colors ${variant === "primary"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
    >
        {children}
    </button>
);

export default Button;
