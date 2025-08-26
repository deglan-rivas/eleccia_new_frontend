import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select } from '../components/ui/Select';
import { 
  ANOS_DISPONIBLES, 
  TIPOS_PROCESO_ELECTORAL, 
  TIPOS_ELECCION, 
  TIPOS_EXPEDIENTE, 
  TIPOS_MATERIA 
} from '../constants/parametros';
import { type SelectOption } from '../types';

interface ContextoSeleccion {
  ano: string;
  tipoProcesoElectoral: string;
  tipoEleccion: string;
  tipoExpediente: string;
  tipoMateria: string;
}

export const ParametrosRequisitos: React.FC = () => {
  const [contexto, setContexto] = useState<ContextoSeleccion>({
    ano: '',
    tipoProcesoElectoral: '',
    tipoEleccion: '',
    tipoExpediente: '',
    tipoMateria: ''
  });

  const [opcionesDisponibles, setOpcionesDisponibles] = useState<{
    tiposProcesoElectoral: SelectOption[];
    tiposEleccion: SelectOption[];
    tiposExpediente: SelectOption[];
    tiposMateria: SelectOption[];
  }>({
    tiposProcesoElectoral: [],
    tiposEleccion: [],
    tiposExpediente: [],
    tiposMateria: []
  });

  // Efecto para actualizar las opciones de Tipo de Proceso Electoral cuando cambia el año
  useEffect(() => {
    if (contexto.ano) {
      const nuevasOpciones = TIPOS_PROCESO_ELECTORAL[contexto.ano] || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposProcesoElectoral: nuevasOpciones
      }));
      
      // Limpiar selecciones dependientes
      setContexto(prev => ({
        ...prev,
        tipoProcesoElectoral: '',
        tipoEleccion: '',
        tipoExpediente: '',
        tipoMateria: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposProcesoElectoral: [],
        tiposEleccion: [],
        tiposExpediente: [],
        tiposMateria: []
      }));
    }
  }, [contexto.ano]);

  // Efecto para actualizar las opciones de Tipo de Elección cuando cambia el tipo de proceso
  useEffect(() => {
    if (contexto.tipoProcesoElectoral) {
      const nuevasOpciones = TIPOS_ELECCION[contexto.tipoProcesoElectoral] || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposEleccion: nuevasOpciones
      }));
      
      // Limpiar selecciones dependientes
      setContexto(prev => ({
        ...prev,
        tipoEleccion: '',
        tipoExpediente: '',
        tipoMateria: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposEleccion: [],
        tiposExpediente: [],
        tiposMateria: []
      }));
    }
  }, [contexto.tipoProcesoElectoral]);

  // Efecto para actualizar las opciones de Tipo de Expediente cuando cambia el tipo de elección
  useEffect(() => {
    if (contexto.tipoEleccion) {
      const nuevasOpciones = TIPOS_EXPEDIENTE[contexto.tipoEleccion] || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposExpediente: nuevasOpciones
      }));
      
      // Limpiar selecciones dependientes
      setContexto(prev => ({
        ...prev,
        tipoExpediente: '',
        tipoMateria: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposExpediente: [],
        tiposMateria: []
      }));
    }
  }, [contexto.tipoEleccion]);

  // Efecto para actualizar las opciones de Tipo de Materia cuando cambia el tipo de expediente
  useEffect(() => {
    if (contexto.tipoExpediente) {
      const nuevasOpciones = TIPOS_MATERIA[contexto.tipoExpediente] || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposMateria: nuevasOpciones
      }));
      
      // Limpiar selección dependiente
      setContexto(prev => ({
        ...prev,
        tipoMateria: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposMateria: []
      }));
    }
  }, [contexto.tipoExpediente]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContexto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Configuración de Parámetros de Evaluación
            </h1>
            <p className="text-gray-600">
              Define los parámetros que serán utilizados para evaluar los requisitos electorales
            </p>
          </div>
        </div>
      </div>

      {/* Configuración Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Bloque 1: Selección de contexto */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full mr-3">
              <span className="text-sm font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Selección de contexto</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-11">
            {/* Año */}
            <Select
              label="Año"
              name="ano"
              value={contexto.ano}
              onChange={handleSelectChange}
              options={ANOS_DISPONIBLES}
              placeholder="Seleccione el año"
              required
            />

            {/* Tipo de Proceso Electoral */}
            <Select
              label="Tipo de Proceso Electoral"
              name="tipoProcesoElectoral"
              value={contexto.tipoProcesoElectoral}
              onChange={handleSelectChange}
              options={opcionesDisponibles.tiposProcesoElectoral}
              placeholder="Seleccione el proceso"
              disabled={!contexto.ano}
              required
            />

            {/* Tipo de Elección */}
            <Select
              label="Tipo de Elección"
              name="tipoEleccion"
              value={contexto.tipoEleccion}
              onChange={handleSelectChange}
              options={opcionesDisponibles.tiposEleccion}
              placeholder="Seleccione el tipo"
              disabled={!contexto.tipoProcesoElectoral}
              required
            />

            {/* Tipo de Expediente */}
            <Select
              label="Tipo de Expediente"
              name="tipoExpediente"
              value={contexto.tipoExpediente}
              onChange={handleSelectChange}
              options={opcionesDisponibles.tiposExpediente}
              placeholder="Seleccione el expediente"
              disabled={!contexto.tipoEleccion}
              required
            />

            {/* Tipo de Materia */}
            <Select
              label="Tipo de Materia"
              name="tipoMateria"
              value={contexto.tipoMateria}
              onChange={handleSelectChange}
              options={opcionesDisponibles.tiposMateria}
              placeholder="Seleccione la materia"
              disabled={!contexto.tipoExpediente}
              required
            />
          </div>
        </div>

        {/* Bloques siguientes - por implementar */}
        <div className="space-y-8">
          {/* Bloque 2: Selección del requisito */}
          <div className="border-t pt-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full mr-3">
                <span className="text-sm font-bold">2</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-400">Selección del requisito</h2>
            </div>
            <div className="ml-11">
              <p className="text-gray-400 italic">
                Este bloque se habilitará una vez completada la selección de contexto
              </p>
            </div>
          </div>

          {/* Bloque 3: Parámetros de evaluación */}
          <div className="border-t pt-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full mr-3">
                <span className="text-sm font-bold">3</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-400">Parámetros de evaluación</h2>
            </div>
            <div className="ml-11">
              <p className="text-gray-400 italic">
                Este bloque se habilitará una vez seleccionado el requisito específico
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      {/* {contexto.ano && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <strong>Contexto seleccionado:</strong>
              {contexto.ano && ` Año: ${contexto.ano}`}
              {contexto.tipoProcesoElectoral && ` | Proceso: ${TIPOS_PROCESO_ELECTORAL[contexto.ano]?.find(p => p.value === contexto.tipoProcesoElectoral)?.label}`}
              {contexto.tipoEleccion && ` | Elección: ${TIPOS_ELECCION[contexto.tipoProcesoElectoral]?.find(e => e.value === contexto.tipoEleccion)?.label}`}
              {contexto.tipoExpediente && ` | Expediente: ${TIPOS_EXPEDIENTE[contexto.tipoEleccion]?.find(exp => exp.value === contexto.tipoExpediente)?.label}`}
              {contexto.tipoMateria && ` | Materia: ${TIPOS_MATERIA[contexto.tipoExpediente]?.find(m => m.value === contexto.tipoMateria)?.label}`}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};