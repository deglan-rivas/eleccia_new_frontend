import React from 'react';

interface DatePickerProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  min?: string; // Fecha mínima en formato YYYY-MM-DD
  max?: string; // Fecha máxima en formato YYYY-MM-DD
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  error,
  min,
  max
}) => {
  const inputClasses = `w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-jne-red focus:border-jne-red outline-none transition-colors ${
    error ? 'border-red-500' : 'border-gray-300'
  } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`;

  // Convertir fecha dd/MM/yyyy a yyyy-MM-dd para input date
  const convertToInputDate = (dateStr: string): string => {
    if (!dateStr) return '';
    
    // Si ya está en formato yyyy-MM-dd, devolverlo tal como está
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateStr;
    }
    
    // Si está en formato dd/MM/yyyy, convertir
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    return '';
  };

  // Convertir fecha yyyy-MM-dd a dd/MM/yyyy para el onChange
  const convertToDisplayDate = (inputDate: string): string => {
    if (!inputDate) return '';
    
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    
    return inputDate;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const displayDate = convertToDisplayDate(inputDate);
    
    // Crear un evento sintético con el valor en formato dd/MM/yyyy
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: displayDate
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type="date"
        name={name}
        value={convertToInputDate(value)}
        onChange={handleInputChange}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        className={inputClasses}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};