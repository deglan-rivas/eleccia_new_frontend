import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/jne.png" alt="JNE Logo" className="h-10" />
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">© 2025 Jurado Nacional de Elecciones - ELECCIA</p>
            <p className="text-xs text-gray-400 mt-1">Sistema de validación de inscripción de listas</p>
          </div>
        </div>
      </div>
    </footer>
  );
};