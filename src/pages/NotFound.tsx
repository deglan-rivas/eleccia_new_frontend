import React from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const NotFound: React.FC = () => {
  // Iconos SVG simples para reemplazar lucide-react
  const HomeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const RefreshIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );

  const MailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const goBack = () => {
    window.history.back();
  };

  const goHome = () => {
    window.location.href = '/';
  };

  const contactUs = () => {
    window.location.href = 'mailto:consultas@jne.gob.pe';
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Illustration Area */}
        <div className="relative">
          <div className="w-64 h-64 mx-auto bg-red-100 rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="text-8xl font-medium text-red-300">404</div>
            <div className="absolute inset-0 bg-gradient-to-t from-red-100 to-transparent"></div>
          </div>
          {/* Floating elements with enhanced bounce animation */}
          <div className="absolute top-4 left-1/4 w-4 h-4 bg-red-300 rounded-full animate-enhanced-bounce"></div>
          <div 
            className="absolute top-12 right-1/4 w-3 h-3 bg-red-400 rounded-full animate-enhanced-bounce" 
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div 
            className="absolute bottom-8 left-1/3 w-2 h-2 bg-red-200 rounded-full animate-enhanced-bounce" 
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl text-red-700 font-bold">¡Oops! Página No Encontrada</h1>
          <p className="text-red-600 max-w-md mx-auto">
            Parece que has intentado acceder a una página que ha sido movida o no existe en este momento.
          </p>
        </div>

        <Card className="p-6 bg-red-100 border-red-200">
          <h3 className="font-medium text-red-800 mb-3">¿Qué puedes hacer?</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Button 
              variant="secondary" 
              onClick={goBack}
              className="flex items-center gap-2 h-auto p-4 flex-col bg-white hover:bg-red-100 text-red-700 border border-red-200 hover:cursor-pointer"
            >
              <RefreshIcon />
              <span className="text-sm">Volver Atrás</span>
            </Button>
            <Button 
              onClick={goHome}
              className="flex items-center gap-2 h-auto p-4 flex-col bg-red-500 hover:bg-red-600 text-white hover:cursor-pointer"
            >
              <HomeIcon />
              <span className="text-sm">Página Principal</span>
            </Button>
            <Button 
              variant="secondary"
              onClick={contactUs}
              className="flex items-center gap-2 h-auto p-4 flex-col bg-white hover:bg-red-100 text-red-700 border border-red-200 hover:cursor-pointer"
            >
              <MailIcon />
              <span className="text-sm">Contáctanos</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};