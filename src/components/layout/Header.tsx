import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/jne.png" alt="JNE Logo" className="h-12" />
          <div className="ml-2 hidden sm:block">
            <h1 className="text-jne-red font-bold text-xl">JNE</h1>
            <p className="text-gray-600 text-xs">Jurado Nacional de Elecciones</p>
          </div>
        </div>
        <Link to="/" className="text-2xl font-bold text-jne-red hover:text-red-700 transition-colors">
          ELECCIA
        </Link>
      </div>
    </header>
  );
};