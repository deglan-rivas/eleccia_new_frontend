import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { RadioGroup } from '../components/forms/RadioGroup';
import { Button } from '../components/ui/Button';
import { 
  ANOS_DISPONIBLES, 
  TIPOS_PROCESO_ELECTORAL, 
  TIPOS_ELECCION, 
  TIPOS_EXPEDIENTE, 
  TIPOS_MATERIA,
  REQUISITOS_ESPECIFICOS,
  PARAMETROS_MOCK,
  TIPOS_VALIDACION,
  UNIDADES_MEDIDA,
  type ParametroEvaluacion
} from '../constants/parametros';
import { type SelectOption } from '../types';

interface ContextoSeleccion {
  ano: string;
  tipoProcesoElectoral: string;
  tipoEleccion: string;
  tipoExpediente: string;
  tipoMateria: string;
  requisitoEspecifico: string;
}

type ParametrosFormulario = ParametroEvaluacion;

export const ParametrosRequisitos: React.FC = () => {
  const [contexto, setContexto] = useState<ContextoSeleccion>({
    ano: '',
    tipoProcesoElectoral: '',
    tipoEleccion: '',
    tipoExpediente: '',
    tipoMateria: '',
    requisitoEspecifico: ''
  });

  const [parametros, setParametros] = useState<ParametrosFormulario>({
    nombreParametro: '',
    tipoValidacion: '',
    valorMinimo: '',
    valorMaximo: '',
    unidadMedida: '',
    tolerancia: '',
    aplicaExcepcion: false,
    descripcionExcepcion: '',
    nombreCriterio: 'cuerpo_lista'
  });

  const [opcionesDisponibles, setOpcionesDisponibles] = useState<{
    tiposProcesoElectoral: SelectOption[];
    tiposEleccion: SelectOption[];
    tiposExpediente: SelectOption[];
    tiposMateria: SelectOption[];
    requisitosEspecificos: SelectOption[];
  }>({
    tiposProcesoElectoral: [],
    tiposEleccion: [],
    tiposExpediente: [],
    tiposMateria: [],
    requisitosEspecificos: []
  });

  const [isSaving, setIsSaving] = useState(false);

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
        tipoMateria: '',
        requisitoEspecifico: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposProcesoElectoral: [],
        tiposEleccion: [],
        tiposExpediente: [],
        tiposMateria: [],
        requisitosEspecificos: []
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
        tipoMateria: '',
        requisitoEspecifico: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposEleccion: [],
        tiposExpediente: [],
        tiposMateria: [],
        requisitosEspecificos: []
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
        tipoMateria: '',
        requisitoEspecifico: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposExpediente: [],
        tiposMateria: [],
        requisitosEspecificos: []
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
        tipoMateria: '',
        requisitoEspecifico: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposMateria: [],
        requisitosEspecificos: []
      }));
    }
  }, [contexto.tipoExpediente]);

  // Efecto para actualizar requisitos específicos cuando cambia el tipo de materia
  useEffect(() => {
    if (contexto.tipoMateria) {
      const nuevasOpciones = REQUISITOS_ESPECIFICOS[contexto.tipoMateria] || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        requisitosEspecificos: nuevasOpciones
      }));
      
      // Limpiar selección dependiente
      setContexto(prev => ({
        ...prev,
        requisitoEspecifico: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        requisitosEspecificos: []
      }));
    }
  }, [contexto.tipoMateria]);

  // Efecto para autocompletar parámetros cuando se selecciona un requisito específico
  useEffect(() => {
    if (contexto.requisitoEspecifico && PARAMETROS_MOCK[contexto.requisitoEspecifico]) {
      const parametrosMock = PARAMETROS_MOCK[contexto.requisitoEspecifico];
      setParametros(parametrosMock);
    } else {
      // Limpiar formulario si no hay requisito seleccionado
      setParametros({
        nombreParametro: '',
        tipoValidacion: '',
        valorMinimo: '',
        valorMaximo: '',
        unidadMedida: '',
        tolerancia: '',
        aplicaExcepcion: false,
        descripcionExcepcion: '',
        nombreCriterio: 'cuerpo_lista'
      });
    }
  }, [contexto.requisitoEspecifico]);

  const handleContextoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContexto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParametroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setParametros(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParametros(prev => ({
      ...prev,
      [name]: value as 'cuerpo_lista' | 'lista_completa'
    }));
  };

  const isFormValid = () => {
    return (
      contexto.requisitoEspecifico &&
      parametros.nombreParametro.trim() &&
      parametros.tipoValidacion.trim() &&
      parametros.valorMinimo.trim() &&
      parametros.valorMaximo.trim() &&
      parametros.unidadMedida.trim()
    );
  };

  const handleSaveConfiguration = async () => {
    if (!isFormValid()) return;
    
    setIsSaving(true);
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la llamada real al backend
      console.log('Configuración guardada:', { contexto, parametros });
      
      // Mostrar mensaje de éxito (se podría usar un toast)
      alert('Configuración guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  const radioOptions = [
    { value: 'cuerpo_lista', label: 'Cuerpo de Lista' },
    { value: 'lista_completa', label: 'Lista Completa' }
  ];

  const showBloque2 = Boolean(contexto.tipoMateria);
  const showRestoBloques = Boolean(contexto.requisitoEspecifico);

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
              onChange={handleContextoChange}
              options={ANOS_DISPONIBLES}
              placeholder="Seleccione el año"
              required
            />

            {/* Tipo de Proceso Electoral */}
            <Select
              label="Tipo de Proceso Electoral"
              name="tipoProcesoElectoral"
              value={contexto.tipoProcesoElectoral}
              onChange={handleContextoChange}
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
              onChange={handleContextoChange}
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
              onChange={handleContextoChange}
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
              onChange={handleContextoChange}
              options={opcionesDisponibles.tiposMateria}
              placeholder="Seleccione la materia"
              disabled={!contexto.tipoExpediente}
              required
            />
          </div>
        </div>

        {/* Bloque 2: Selección del requisito */}
        {showBloque2 && (
          <div className="mb-8 border-t pt-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full mr-3">
                <span className="text-sm font-bold">2</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Selección del requisito</h2>
            </div>

            <div className="ml-11">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requisito Específico - A la izquierda */}
                <Select
                  label="Requisito Específico"
                  name="requisitoEspecifico"
                  value={contexto.requisitoEspecifico}
                  onChange={handleContextoChange}
                  options={opcionesDisponibles.requisitosEspecificos}
                  placeholder="Seleccione el requisito específico"
                  required
                />
                
                {/* Resto del bloque 2 - Solo se muestra si hay requisito seleccionado */}
                {showRestoBloques && (
                  <div className="space-y-4">
                    <Input
                      label="Nombre del parámetro"
                      name="nombreParametro"
                      value={parametros.nombreParametro}
                      onChange={handleParametroChange}
                      placeholder="Nombre descriptivo del parámetro"
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bloque 3: Parámetros de evaluación */}
        {showRestoBloques && (
          <div className="border-t pt-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full mr-3">
                <span className="text-sm font-bold">3</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Parámetros de evaluación</h2>
            </div>
            
            <div className="ml-11">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tipo de validación */}
                <Select
                  label="Tipo de validación"
                  name="tipoValidacion"
                  value={parametros.tipoValidacion}
                  onChange={handleParametroChange}
                  options={TIPOS_VALIDACION}
                  placeholder="Seleccione el tipo"
                  required
                />

                {/* Valor mínimo */}
                <Input
                  label="Valor mínimo"
                  name="valorMinimo"
                  type="number"
                  value={parametros.valorMinimo}
                  onChange={handleParametroChange}
                  placeholder="0"
                  required
                />

                {/* Valor máximo */}
                <Input
                  label="Valor máximo"
                  name="valorMaximo"
                  type="number"
                  value={parametros.valorMaximo}
                  onChange={handleParametroChange}
                  placeholder="100"
                  required
                />

                {/* Unidad de medida */}
                <Select
                  label="Unidad de medida"
                  name="unidadMedida"
                  value={parametros.unidadMedida}
                  onChange={handleParametroChange}
                  options={UNIDADES_MEDIDA}
                  placeholder="Seleccione unidad"
                  required
                />

                {/* Tolerancia */}
                <Input
                  label="Tolerancia"
                  name="tolerancia"
                  type="number"
                  value={parametros.tolerancia}
                  onChange={handleParametroChange}
                  placeholder="0"
                />

                {/* Aplica excepción */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    ¿Aplica excepción?
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="aplicaExcepcion"
                      checked={parametros.aplicaExcepcion}
                      onChange={handleParametroChange}
                      className="h-4 w-4 text-jne-red focus:ring-jne-red border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">Sí, aplica excepción</label>
                  </div>
                </div>

                {/* Descripción de excepción */}
                {parametros.aplicaExcepcion && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <Input
                      label="Descripción de la excepción"
                      name="descripcionExcepcion"
                      value={parametros.descripcionExcepcion}
                      onChange={handleParametroChange}
                      placeholder="Describa cuándo aplica la excepción..."
                    />
                  </div>
                )}

                {/* Nombre del criterio - Radio buttons */}
                <div className="md:col-span-2 lg:col-span-3">
                  <RadioGroup
                    name="nombreCriterio"
                    value={parametros.nombreCriterio}
                    onChange={handleRadioChange}
                    options={radioOptions}
                    label="Nombre del criterio"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        {showRestoBloques && (
          <div className="border-t pt-6 mt-8">
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setContexto({
                    ano: '',
                    tipoProcesoElectoral: '',
                    tipoEleccion: '',
                    tipoExpediente: '',
                    tipoMateria: '',
                    requisitoEspecifico: ''
                  });
                  setParametros({
                    nombreParametro: '',
                    tipoValidacion: '',
                    valorMinimo: '',
                    valorMaximo: '',
                    unidadMedida: '',
                    tolerancia: '',
                    aplicaExcepcion: false,
                    descripcionExcepcion: '',
                    nombreCriterio: 'cuerpo_lista'
                  });
                }}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="primary"
                disabled={!isFormValid() || isSaving}
                loading={isSaving}
                onClick={handleSaveConfiguration}
              >
                Guardar Configuración
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};