import React, { useState } from 'react';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';

interface FormData {
  num_expediente: string;
  tipo_expediente: string;
  tipo_materia: string;
}

// Interfaces para la validación
interface ValidationSuccess {
  isValid: true;
  tipoEleccion: string;
  año: number;
  codigo: string;
}

interface ValidationError {
  isValid: false;
  error: string;
}

type ValidationResult = ValidationSuccess | ValidationError;

// Función de validación del formato de expediente
const validateExpedienteFormat = (expediente: string): ValidationResult => {
  const trimmedExpediente = expediente.trim().toUpperCase();
  
  // Regex para validar el formato: (EG|ERM|EMC).YYYY######
  const expedienteRegex = /^(EG|ERM|EMC)\.(\d{4})(\d{6})$/;
  const match = trimmedExpediente.match(expedienteRegex);
  
  if (!match) {
    return {
      isValid: false,
      error: 'Formato inválido. El expediente debe seguir el patrón: EG.2026105522, ERM.2022012288 o EMC.2025005358'
    };
  }
  
  const [, tipoEleccion, año, codigo] = match;
  const añoNum = parseInt(año);
  const añoActual = new Date().getFullYear();
  
  // Validar que el año sea razonable (entre 2000 y 5 años en el futuro)
  if (añoNum < 2000 || añoNum > añoActual + 5) {
    return {
      isValid: false,
      error: `Año inválido (${año}). El año debe estar entre 2000 y ${añoActual + 5}`
    };
  }
  
  // Validar que el código tenga exactamente 6 dígitos
  if (codigo.length !== 6) {
    return {
      isValid: false,
      error: 'El código del expediente debe tener exactamente 6 dígitos'
    };
  }
  
  // Validar tipos de proceso electoral
  const tiposValidos = {
    'EG': 'Elecciones Generales',
    'ERM': 'Elecciones Regionales y Municipales',
    'EMC': 'Elecciones Municipales Complementarias'
  };
  
  return {
    isValid: true,
    tipoEleccion: tiposValidos[tipoEleccion as keyof typeof tiposValidos],
    año: añoNum,
    codigo
  };
};

export const Home: React.FC = () => {
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    num_expediente: '',
    tipo_expediente: '1',
    tipo_materia: '5'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.num_expediente.trim()) {
      showError('El número de expediente es requerido');
      return;
    }

    // Validar formato del expediente
    const validationResult = validateExpedienteFormat(formData.num_expediente);
    
    if (!validationResult.isValid) {
      showError(validationResult.error || 'Formato de expediente inválido');
      return;
    }

    // Si es válido, mostrar información en console.log
    if (validationResult.isValid) {
      console.log('📋 Expediente válido:', {
        expediente: formData.num_expediente.trim().toUpperCase(),
        tipoEleccion: validationResult.tipoEleccion,
        año: validationResult.año,
        codigo: validationResult.codigo,
        timestamp: new Date().toISOString()
      });
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: En el futuro, enviar al backend para procesamiento
      // const response = await fetch('/api/analiza_expediente', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     num_expediente: formData.num_expediente.trim().toUpperCase()
      //   })
      // });

      // Simular procesamiento por ahora
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccess(`Expediente ${formData.num_expediente.trim().toUpperCase()} procesado exitosamente`);
      
      // TODO: navigate(`/expediente/${result.id}`);
    } catch (error) {
      console.error('Error:', error);
      showError(error instanceof Error ? error.message : 'Ocurrió un error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert 
          message={error} 
          type="error" 
          onClose={() => setError(null)} 
        />
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Generador de Proyectos de Resolución
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Este sistema analiza los documentos ingresados para generar proyectos de resolución para procesos jurisdiccionales.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Expediente</h3>
            <p className="text-sm text-gray-600">Ingrese el número de expediente para proceder con el análisis</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Pendiente de análisis
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Número de Expediente"
              name="num_expediente"
              value={formData.num_expediente}
              onChange={handleInputChange}
              placeholder="Ej: EG.2026105522, ERM.2022012288, EMC.2025005358"
              required
            />
            
            {/* <Select
              label="Tipo de Expediente"
              name="tipo_expediente"
              value={formData.tipo_expediente}
              onChange={handleInputChange}
              options={TIPO_EXPEDIENTE_OPTIONS}
              required
            />
            
            <Select
              label="Tipo de Materia"
              name="tipo_materia"
              value={formData.tipo_materia}
              onChange={handleInputChange}
              options={TIPO_MATERIA_OPTIONS}
              required
            /> */}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button 
              type="submit" 
              loading={loading}
              disabled={loading}
            >
              Analizar Expediente
            </Button>
          </div>
        </form>
      </div>

      {/* Toast para notificaciones */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
        duration={4000}
      />
    </>
  );
};