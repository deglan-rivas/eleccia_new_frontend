import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { TIPO_EXPEDIENTE_OPTIONS, TIPO_MATERIA_OPTIONS } from '../constants/options';

interface FormData {
  num_expediente: string;
  tipo_expediente: string;
  tipo_materia: string;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
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
      setError('El número de expediente es requerido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/analiza_expediente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al procesar el expediente');
      }

      const result = await response.json();
      navigate(`/expediente/${result.id}`);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Ocurrió un error al procesar la solicitud');
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
              placeholder="Ej: 0025-2023-JNE"
              required
            />
            
            <Select
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
            />
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
    </>
  );
};