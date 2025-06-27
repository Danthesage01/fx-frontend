import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
  /** Input field ID */
  id: string;
  /** Input field name */
  name: string;
  /** Label text for the input field */
  label: string;
  /** Input type (text, email, password, tel, etc.) */
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "number"
    | "url"
    | "search"
    | "date";
  /** Placeholder text */
  placeholder?: string;
  /** Current input value */
  value: string;
  /** Change handler function */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the input */
  className?: string;
  /** Error message to display */
  error?: string;
}

/**
 * FormField - A reusable form field component for various input types
 */
const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  error = "",
}) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Determine actual input type for password fields
  const inputType = type === "password" && showPassword ? "text" : type;

  // Toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            dark:bg-gray-800 dark:border-gray-600 dark:text-white 
            ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
            ${disabled ? "bg-gray-100 cursor-not-allowed dark:bg-gray-700" : ""}
            ${type === "password" ? "pr-10" : ""}
            ${className}`}
        />

        {/* Password visibility toggle button */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormField;
