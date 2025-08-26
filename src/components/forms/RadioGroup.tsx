import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  required = false,
  disabled = false,
  className = '',
  error
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className={`block text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className={`h-4 w-4 border-gray-300 text-jne-red focus:ring-jne-red ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`ml-3 text-sm ${
                disabled 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 cursor-pointer'
              }`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-red-600 text-sm flex items-center mt-1">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};