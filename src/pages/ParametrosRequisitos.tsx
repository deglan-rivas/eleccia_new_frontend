import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { DatePicker } from '../components/ui/DatePicker';
import { RadioGroup } from '../components/forms/RadioGroup';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { PARAMETROS_ENDPOINTS, buildUrl } from '../config/endpoints';
import parametrosService, { type FrontendParametrosStructure } from '../services/parametrosService';
import { 
  CATEGORIAS_REQUISITO,
  updateConfiguracionContexto,
  type ParametroEvaluacion,
  type ParametroIndividual
} from '../constants/parametros.temp';
import { type SelectOption } from '../types';

interface ContextoSeleccion {
  ano: string;
  tipoProcesoElectoral: string;
  tipoEleccion: string;
  tipoExpediente: string;
  tipoMateria: string;
  requisitoEspecifico: string;
}

interface ParametrosFormulario extends ParametroEvaluacion {
  parametrosValues: Record<string, string | number>;
}

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
    categoriaRequisito: '',
    descripcionRequisito: '',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [],
    parametrosValues: {}
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
  const [isLoadingParametros, setIsLoadingParametros] = useState(true);
  const [parametrosData, setParametrosData] = useState<FrontendParametrosStructure | null>(null);
  const { toast, showSuccess, showError, hideToast } = useToast();

  // Funciones auxiliares para manejar configuración dinámica
  const getOptionsForYear = useCallback((ano: string) => {
    return parametrosData?.ESTRUCTURA_POR_ANO?.[ano] || {
      TIPOS_PROCESO_ELECTORAL: [],
      TIPOS_ELECCION: [],
      TIPOS_EXPEDIENTE: [],
      TIPOS_MATERIA: [],
      REQUISITOS_ESPECIFICOS: []
    };
  }, [parametrosData]);

  const getConfiguracionFromDynamicData = useCallback((ano: string, contexto: ContextoSeleccion) => {
    try {
      return parametrosData?.ESTRUCTURA_POR_ANO?.[ano]?.CONFIGURACIONES?.[contexto.tipoProcesoElectoral]?.[contexto.tipoEleccion]?.[contexto.tipoExpediente]?.[contexto.tipoMateria]?.[contexto.requisitoEspecifico];
    } catch {
      return null;
    }
  }, [parametrosData]);

  // Cargar parámetros dinámicos del backend al inicio
  useEffect(() => {
    const loadParametros = async () => {
      try {
        setIsLoadingParametros(true);
        const data = await parametrosService.getParametros();
        console.log('Datos cargados del backend:', data);
        setParametrosData(data);
      } catch (error) {
        console.error('Error loading parametros:', error);
        showError('Error al cargar parámetros del backend');
      } finally {
        setIsLoadingParametros(false);
      }
    };

    loadParametros();
  }, [showError]);

  // Efectos para la cascada de selección (usando datos dinámicos)
  useEffect(() => {
    if (contexto.ano && parametrosData) {
      console.log('Año seleccionado:', contexto.ano);
      const opcionesAno = getOptionsForYear(contexto.ano);
      console.log('Opciones para año:', opcionesAno);
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposProcesoElectoral: opcionesAno.TIPOS_PROCESO_ELECTORAL
      }));
      
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
  }, [contexto.ano, parametrosData, getOptionsForYear]);

  useEffect(() => {
    if (contexto.tipoProcesoElectoral && parametrosData && contexto.ano) {
      const opcionesAno = getOptionsForYear(contexto.ano);
      const nuevasOpciones = opcionesAno.TIPOS_ELECCION || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposEleccion: nuevasOpciones
      }));
      
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
  }, [contexto.tipoProcesoElectoral, contexto.ano, parametrosData, getOptionsForYear]);

  useEffect(() => {
    if (contexto.tipoEleccion && parametrosData && contexto.ano) {
      const opcionesAno = getOptionsForYear(contexto.ano);
      const nuevasOpciones = opcionesAno.TIPOS_EXPEDIENTE || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposExpediente: nuevasOpciones
      }));
      
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
  }, [contexto.tipoEleccion, contexto.ano, parametrosData, getOptionsForYear]);

  useEffect(() => {
    if (contexto.tipoExpediente && parametrosData && contexto.ano) {
      const opcionesAno = getOptionsForYear(contexto.ano);
      const nuevasOpciones = opcionesAno.TIPOS_MATERIA || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposMateria: nuevasOpciones
      }));
      
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
  }, [contexto.tipoExpediente, contexto.ano, parametrosData, getOptionsForYear]);

  useEffect(() => {
    if (contexto.tipoMateria && parametrosData && contexto.ano) {
      const opcionesAno = getOptionsForYear(contexto.ano);
      const nuevasOpciones = opcionesAno.REQUISITOS_ESPECIFICOS || [];
      setOpcionesDisponibles(prev => ({
        ...prev,
        requisitosEspecificos: nuevasOpciones
      }));
      
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
  }, [contexto.tipoMateria, contexto.ano, parametrosData, getOptionsForYear]);

  // Efecto para autocompletar parámetros cuando se selecciona un requisito específico
  useEffect(() => {
    if (contexto.requisitoEspecifico && parametrosData) {
      // Verificar si todos los campos del contexto están completos
      const contextoCompleto = contexto.ano && contexto.tipoProcesoElectoral && 
                              contexto.tipoEleccion && contexto.tipoExpediente && 
                              contexto.tipoMateria && contexto.requisitoEspecifico;
      
      if (contextoCompleto) {
        // Obtener configuración específica del contexto desde datos dinámicos
        const configuracionContexto = getConfiguracionFromDynamicData(contexto.ano, contexto);
        
        if (configuracionContexto) {
          const parametrosValues: Record<string, string | number> = {};
          (configuracionContexto.parametros || []).forEach(param => {
            parametrosValues[param.nombre] = param.valor;
          });
          
          setParametros({
            categoriaRequisito: configuracionContexto.categoriaRequisito,
            descripcionRequisito: configuracionContexto.descripcion,
            obligatoriedad: configuracionContexto.habilitado ? 'obligatorio' : 'opcional',
            nombreCriterio: 'cuerpo_lista',
            parametros: configuracionContexto.parametros || [],
            parametrosValues
          });
        } else {
          // No hay configuración para este contexto
          setParametros({
            categoriaRequisito: '',
            descripcionRequisito: '',
            obligatoriedad: 'obligatorio',
            nombreCriterio: 'cuerpo_lista',
            parametros: [],
            parametrosValues: {}
          });
        }
      }
    } else {
      setParametros({
        categoriaRequisito: '',
        descripcionRequisito: '',
        obligatoriedad: 'obligatorio',
        nombreCriterio: 'cuerpo_lista',
        parametros: [],
        parametrosValues: {}
      });
    }
  }, [contexto, parametrosData, getConfiguracionFromDynamicData]);

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

  const handleParametroValueChange = (parametroNombre: string, value: string | number) => {
    setParametros(prev => ({
      ...prev,
      parametrosValues: {
        ...prev.parametrosValues,
        [parametroNombre]: value
      }
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'nombreCriterio') {
      setParametros(prev => ({
        ...prev,
        [name]: value as 'cuerpo_lista' | 'lista_completa'
      }));
    } else if (name === 'obligatoriedad') {
      setParametros(prev => ({
        ...prev,
        [name]: value as 'obligatorio' | 'opcional'
      }));
    } else {
      // Para radio buttons de parámetros individuales
      handleParametroValueChange(name, value);
    }
  };

  const isFormValid = () => {
    if (!contexto.requisitoEspecifico || !parametros.categoriaRequisito || !parametros.descripcionRequisito.trim()) {
      return false;
    }
    
    // Verificar que todos los parámetros requeridos tengan valor
    for (const param of parametros.parametros) {
      const value = parametros.parametrosValues[param.nombre];
      if (value === undefined || value === '' || value === null) {
        return false;
      }
    }
    
    return true;
  };

  const generarObjetoSalida = (contexto: ContextoSeleccion, parametrosValues: Record<string, string | number>, parametros: ParametrosFormulario) => {
    if (!parametrosData || !contexto.ano) {
      throw new Error('Datos de parámetros no disponibles');
    }

    const opcionesAno = getOptionsForYear(contexto.ano);
    
    // Debug: log what we're trying to match
    console.log('🔍 Contexto a buscar:', {
      ano: contexto.ano,
      tipoProcesoElectoral: contexto.tipoProcesoElectoral,
      tipoEleccion: contexto.tipoEleccion,
      tipoExpediente: contexto.tipoExpediente,
      tipoMateria: contexto.tipoMateria,
      requisitoEspecifico: contexto.requisitoEspecifico
    });
    
    // Debug: log available options
    console.log('📋 Opciones disponibles:', {
      TIPOS_PROCESO_ELECTORAL: opcionesAno.TIPOS_PROCESO_ELECTORAL,
      TIPOS_ELECCION: opcionesAno.TIPOS_ELECCION,
      TIPOS_EXPEDIENTE: opcionesAno.TIPOS_EXPEDIENTE,
      TIPOS_MATERIA: opcionesAno.TIPOS_MATERIA,
      REQUISITOS_ESPECIFICOS: opcionesAno.REQUISITOS_ESPECIFICOS
    });
    
    // Find the correct IDs based on the selected values (IDs stored in context)
    console.log('🔎 Buscando tipoProceso por value:', contexto.tipoProcesoElectoral, 'en:', opcionesAno.TIPOS_PROCESO_ELECTORAL.map(tp => tp.value));
    const tipoProceso = opcionesAno.TIPOS_PROCESO_ELECTORAL.find(tp => tp.value === contexto.tipoProcesoElectoral);
    
    console.log('🔎 Buscando tipoEleccion por value:', contexto.tipoEleccion, 'en:', opcionesAno.TIPOS_ELECCION.map(te => te.value));
    const tipoEleccion = opcionesAno.TIPOS_ELECCION.find(te => te.value === contexto.tipoEleccion);
    
    console.log('🔎 Buscando tipoExpediente por value:', contexto.tipoExpediente, 'en:', opcionesAno.TIPOS_EXPEDIENTE.map(texp => texp.value));
    const tipoExpediente = opcionesAno.TIPOS_EXPEDIENTE.find(texp => texp.value === contexto.tipoExpediente);
    
    console.log('🔎 Buscando tipoMateria por value:', contexto.tipoMateria, 'en:', opcionesAno.TIPOS_MATERIA.map(tm => tm.value));
    const tipoMateria = opcionesAno.TIPOS_MATERIA.find(tm => tm.value === contexto.tipoMateria);
    
    const requisitoEspecifico = opcionesAno.REQUISITOS_ESPECIFICOS.find(re => re.value === contexto.requisitoEspecifico);
    
    console.log('🔍 Resultados de búsqueda:', {
      tipoProceso,
      tipoEleccion,
      tipoExpediente,
      tipoMateria,
      requisitoEspecifico
    });

    if (!tipoProceso || !tipoEleccion || !tipoExpediente || !tipoMateria || !requisitoEspecifico) {
      throw new Error('No se pudieron encontrar los IDs correspondientes para la configuración seleccionada');
    }

    return {
      ANIO: parseInt(contexto.ano),
      TIPO_PROCESO: parseInt(tipoProceso.value),
      TIPO_ELECCION: parseInt(tipoEleccion.value),
      ID_TIPO_EXPEDIENTE: parseInt(tipoExpediente.value),
      ID_MATERIA: parseInt(tipoMateria.value),
      ID_REQUISITO: parseInt(requisitoEspecifico.value),
      TIPO_REQUISITO: 1, // Default value, might need to be derived from backend data
      DESCRIPCION: parametros.descripcionRequisito,
      CONF_PARAM: Object.keys(parametrosValues).length > 0 ? parametrosValues : {}
    };
  };

  const handleSaveConfiguration = async () => {
    if (!isFormValid()) return;
    
    setIsSaving(true);
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Actualizar la configuración en el contexto jerárquico
      updateConfiguracionContexto(contexto, parametros.parametrosValues);
      
      // Generar objeto de salida según especificaciones
      const objetoSalida = generarObjetoSalida(contexto, parametros.parametrosValues, parametros);
      
      // Enviar JSON al backend
      let backendSuccess = false;
      try {
        const endpointUrl = buildUrl(PARAMETROS_ENDPOINTS.SAVE_CONFIGURATION);
        const response = await axios.post(endpointUrl, objetoSalida, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 segundos de timeout
        });
        
        console.log('✅ Respuesta del backend:', response.data);
        backendSuccess = true;
      } catch (backendError) {
        console.warn('⚠️ Error al comunicar con backend (continuando con funcionalidad local):', backendError);
        // No lanzamos error para no interrumpir la funcionalidad local
        backendSuccess = false;
      }
      
      // Imprimir en consola con formato especificado
      console.log('📋 Configuración guardada:', objetoSalida);
      
      // Mostrar mensaje de éxito con Toast
      const opcionesAno = getOptionsForYear(contexto.ano);
      const requistoLabel = opcionesAno.REQUISITOS_ESPECIFICOS?.find(r => r.value === contexto.requisitoEspecifico)?.label;
      const parametrosInfo = parametros.parametros.length > 0 ? 
        `con ${parametros.parametros.length} parámetro(s) configurado(s)` : 
        'sin parámetros configurables (EleccIA maneja la validación internamente)';
      
      const backendStatus = backendSuccess ? '✅ Enviado al backend' : '⚠️ Solo guardado localmente';
      
      showSuccess(
        `Configuración guardada exitosamente para el requisito "${requistoLabel}" ${parametrosInfo}. ${backendStatus}.`
      );
      
    } catch (error) {
      console.error('❌ Error al guardar la configuración:', error);
      showError('Error al guardar la configuración. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  // const radioOptions = [
  //   { value: 'cuerpo_lista', label: 'Cuerpo de Lista' },
  //   { value: 'lista_completa', label: 'Lista Completa' }
  // ];

  const showBloque2 = Boolean(contexto.tipoMateria);
  const showRestoBloques = Boolean(contexto.requisitoEspecifico);

  const renderParametro = (param: ParametroIndividual) => {
    const currentValue = parametros.parametrosValues[param.nombre] || param.valor;
    
    switch (param.tipo) {
      case 'number':
        return (
          <Input
            key={param.nombre}
            label={param.unidad ? `${param.nombre} (${param.unidad})` : param.nombre}
            name={param.nombre}
            type="number"
            value={currentValue.toString()}
            onChange={(e) => handleParametroValueChange(param.nombre, Number(e.target.value))}
            min={param.min}
            max={param.max}
            step={param.step}
            required
          />
        );
      
      case 'select':
        return (
          <Select
            key={param.nombre}
            label={param.unidad ? `${param.nombre} (${param.unidad})` : param.nombre}
            name={param.nombre}
            value={currentValue.toString()}
            onChange={(e) => handleParametroValueChange(param.nombre, e.target.value)}
            options={param.opciones || []}
            required
          />
        );
      
      case 'radio':
        return (
          <RadioGroup
            key={param.nombre}
            name={param.nombre}
            label={param.unidad ? `${param.nombre} (${param.unidad})` : param.nombre}
            value={currentValue.toString()}
            onChange={handleRadioChange}
            options={param.opciones || []}
            required
          />
        );
      
      case 'date':
        return (
          <DatePicker
            key={param.nombre}
            label={param.unidad ? `${param.nombre} (${param.unidad})` : param.nombre}
            name={param.nombre}
            value={currentValue.toString()}
            onChange={(e) => handleParametroValueChange(param.nombre, e.target.value)}
            required
          />
        );
      
      default:
        return null;
    }
  };

  if (isLoadingParametros) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-jne-red"></div>
      </div>
    );
  }

  if (!parametrosData) {
    return (
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error al cargar parámetros</strong>
          <p className="text-sm mt-1">No se pudieron cargar los parámetros desde el backend.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Configuración de Parámetros de Evaluación
        </h1>
        <p className="text-gray-600">
          Define los parámetros que serán utilizados para evaluar los requisitos electorales
        </p>
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
            <Select
              label="Año"
              name="ano"
              value={contexto.ano}
              onChange={handleContextoChange}
              options={parametrosData?.ANOS_DISPONIBLES || []}
              placeholder="Seleccione el año"
              required
              disabled={isLoadingParametros}
            />

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
                  <>
                    <Select
                      label="Categoría del requisito"
                      name="categoriaRequisito"
                      value={parametros.categoriaRequisito}
                      onChange={handleParametroChange}
                      options={CATEGORIAS_REQUISITO}
                      placeholder="Seleccione la categoría"
                      required
                    />
                    
                    <div className="md:col-span-2">
                      <Input
                        label="Descripción del Requisito"
                        name="descripcionRequisito"
                        value={parametros.descripcionRequisito}
                        onChange={handleParametroChange}
                        placeholder="Descripción detallada del requisito..."
                        required
                      />
                    </div>
                    
                    {/* 
                    <div className="md:col-span-2">
                      <RadioGroup
                        name="obligatoriedad"
                        label="Obligatoriedad"
                        value={parametros.obligatoriedad}
                        onChange={handleRadioChange}
                        options={OPCIONES_OBLIGATORIEDAD}
                        required
                      />
                    </div>
                    */}
                  </>
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
            
            <div className="ml-11 space-y-6">
              {/* Parámetros dinámicos */}
              {parametros.parametros.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {parametros.parametros.map((param) => renderParametro(param))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">No hay parámetros configurables</p>
                      <p className="text-gray-500 text-sm mt-1">EleccIA realiza la validación internamente</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Radio buttons para Nombre del criterio */}
              {/* <RadioGroup
                name="nombreCriterio"
                label="Modo de Aplicación"
                value={parametros.nombreCriterio}
                onChange={handleRadioChange}
                options={radioOptions}
                required
              /> */}
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
                    categoriaRequisito: '',
                    descripcionRequisito: '',
                    obligatoriedad: 'obligatorio',
                    nombreCriterio: 'cuerpo_lista',
                    parametros: [],
                    parametrosValues: {}
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
      
      {/* Toast para notificaciones */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
        duration={4000}
      />
    </div>
  );
};