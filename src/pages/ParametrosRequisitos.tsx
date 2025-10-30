import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { DatePicker } from '../components/ui/DatePicker';
import { RadioGroup } from '../components/forms/RadioGroup';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { PARAMETROS_ENDPOINTS, buildUrl } from '../config/endpoints';
import parametrosService, { 
  type FrontendParametrosStructure,
  type TipoRequisitoOption 
} from '../services/parametrosService';
import { type SelectOption } from '../types';

interface ParametroIndividual {
  nombre: string;
  unidad: string;
  tipo: 'number' | 'select' | 'radio' | 'date';
  valor: string | number;
  opciones?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
  obligatorio: boolean;
}

interface ParametroEvaluacion {
  categoriaRequisito: string;
  descripcionRequisito: string;
  obligatoriedad: 'obligatorio' | 'opcional';
  nombreCriterio: 'cuerpo_lista' | 'lista_completa';
  parametros: ParametroIndividual[];
  esSubsanable?: boolean;
}

interface ContextoSeleccion {
  ano: string;
  tipoProcesoElectoral: string;
  tipoEleccion: string;
  tipoExpediente: string;
  tipoMateria: string;
  categoriaRequisito: string;
  requisitoEspecifico: string;
}

interface ParametrosFormulario extends ParametroEvaluacion {
  parametrosValues: Record<string, string | number>;
  esSubsanable: boolean;
}

export const ParametrosRequisitos: React.FC = () => {
  const [contexto, setContexto] = useState<ContextoSeleccion>({
    ano: '',
    tipoProcesoElectoral: '',
    tipoEleccion: '',
    tipoExpediente: '',
    tipoMateria: '',
    categoriaRequisito: '',
    requisitoEspecifico: ''
  });

  const [parametros, setParametros] = useState<ParametrosFormulario | null>(null);
  const [parametrosModificados, setParametrosModificados] = useState(false);
  
  // Almacena las modificaciones por requisito específico
  const modificacionesPorRequisito = useRef<Record<string, ParametrosFormulario>>({});
  const requisitoActualRef = useRef<string>('');

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
  const [tiposRequisito, setTiposRequisito] = useState<TipoRequisitoOption[]>([]);
  const [categoriasDisponibles, setCategoriasDisponibles] = useState<TipoRequisitoOption[]>([]);
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
        
        // Cargar parámetros y tipos de requisito en paralelo
        const [parametrosData, tiposRequisitoData] = await Promise.all([
          parametrosService.getParametros(),
          parametrosService.getTiposRequisito()
        ]);
        
        console.log('Datos cargados del backend:', parametrosData);
        console.log('Tipos de requisito cargados:', tiposRequisitoData);
        
        setParametrosData(parametrosData);
        setTiposRequisito(tiposRequisitoData);
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
        categoriaRequisito: '',
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
        categoriaRequisito: '',
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
        categoriaRequisito: '',
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
    if (contexto.tipoExpediente && parametrosData && contexto.ano && 
        contexto.tipoProcesoElectoral && contexto.tipoEleccion) {
      
      // Obtener las materias filtradas por el contexto
      const configuraciones = parametrosData.ESTRUCTURA_POR_ANO?.[contexto.ano]?.CONFIGURACIONES;
      
      if (configuraciones) {
        const materiasParaContexto = configuraciones[contexto.tipoProcesoElectoral]
          ?.[contexto.tipoEleccion]
          ?.[contexto.tipoExpediente];
        
        if (materiasParaContexto) {
          // Obtener solo los IDs de materias que existen en este contexto
          const materiasIds = Object.keys(materiasParaContexto);
          
          // Filtrar TIPOS_MATERIA para mostrar solo las válidas
          const opcionesAno = getOptionsForYear(contexto.ano);
          const materiasFiltradas = opcionesAno.TIPOS_MATERIA.filter(materia => 
            materiasIds.includes(materia.value)
          );
          
          setOpcionesDisponibles(prev => ({
            ...prev,
            tiposMateria: materiasFiltradas
          }));
        } else {
          setOpcionesDisponibles(prev => ({
            ...prev,
            tiposMateria: []
          }));
        }
      } else {
        setOpcionesDisponibles(prev => ({
          ...prev,
          tiposMateria: []
        }));
      }
      
      setContexto(prev => ({
        ...prev,
        tipoMateria: '',
        categoriaRequisito: '',
        requisitoEspecifico: ''
      }));
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        tiposMateria: [],
        requisitosEspecificos: []
      }));
    }
  }, [contexto.tipoExpediente, contexto.ano, contexto.tipoProcesoElectoral, 
      contexto.tipoEleccion, parametrosData, getOptionsForYear]);

  // Efecto para filtrar requisitos específicos por materia (y opcionalmente por categoría)
  useEffect(() => {
    if (contexto.tipoMateria && parametrosData && contexto.ano && 
        contexto.tipoProcesoElectoral && contexto.tipoEleccion && contexto.tipoExpediente) {
      
      // Obtener los requisitos filtrados por el contexto completo
      const configuraciones = parametrosData.ESTRUCTURA_POR_ANO?.[contexto.ano]?.CONFIGURACIONES;
      
      if (configuraciones) {
        const requisitosParaContexto = configuraciones[contexto.tipoProcesoElectoral]
          ?.[contexto.tipoEleccion]
          ?.[contexto.tipoExpediente]
          ?.[contexto.tipoMateria];
        
        if (requisitosParaContexto) {
          let requisitosIds = Object.keys(requisitosParaContexto);
          
          // Si hay una categoría seleccionada, filtrar por ella
          if (contexto.categoriaRequisito) {
            requisitosIds = requisitosIds.filter(reqId => {
              const config = requisitosParaContexto[reqId];
              return config.categoriaRequisito === contexto.categoriaRequisito;
            });
          }
          
          // Filtrar REQUISITOS_ESPECIFICOS para mostrar solo los válidos
          const opcionesAno = getOptionsForYear(contexto.ano);
          const requisitosFiltrados = opcionesAno.REQUISITOS_ESPECIFICOS.filter(req => 
            requisitosIds.includes(req.value)
          );
          
          setOpcionesDisponibles(prev => ({
            ...prev,
            requisitosEspecificos: requisitosFiltrados
          }));
        } else {
          // No hay configuraciones para este contexto
          setOpcionesDisponibles(prev => ({
            ...prev,
            requisitosEspecificos: []
          }));
        }
      } else {
        setOpcionesDisponibles(prev => ({
          ...prev,
          requisitosEspecificos: []
        }));
      }
      
      // Limpiar requisito específico si la categoría cambió
      if (contexto.categoriaRequisito) {
        setContexto(prev => ({
          ...prev,
          requisitoEspecifico: ''
        }));
      }
    } else {
      setOpcionesDisponibles(prev => ({
        ...prev,
        requisitosEspecificos: []
      }));
    }
  }, [contexto.tipoMateria, contexto.categoriaRequisito, contexto.ano, contexto.tipoProcesoElectoral, 
      contexto.tipoEleccion, contexto.tipoExpediente, parametrosData, getOptionsForYear]);

  // Efecto para filtrar las categorías disponibles según el contexto seleccionado (materia)
  useEffect(() => {
    if (contexto.tipoMateria && parametrosData && tiposRequisito.length > 0) {
      const contextoBase = contexto.ano && contexto.tipoProcesoElectoral && 
                          contexto.tipoEleccion && contexto.tipoExpediente && 
                          contexto.tipoMateria;
      
      if (contextoBase) {
        try {
          // Obtener TODAS las configuraciones para este contexto (todos los requisitos)
          const configuracionesPorRequisito = parametrosData?.ESTRUCTURA_POR_ANO?.[contexto.ano]
            ?.CONFIGURACIONES?.[contexto.tipoProcesoElectoral]?.[contexto.tipoEleccion]
            ?.[contexto.tipoExpediente]?.[contexto.tipoMateria];
          
          if (configuracionesPorRequisito) {
            // Extraer todas las categorías únicas de todas las configuraciones
            const categoriasIds = new Set<string>();
            Object.values(configuracionesPorRequisito).forEach((config: any) => {
              if (config.categoriaRequisito) {
                categoriasIds.add(config.categoriaRequisito);
              }
            });
            
            // Filtrar tiposRequisito para mostrar solo las categorías que existen en este contexto
            const categoriasFiltradas = tiposRequisito.filter(tipo => 
              categoriasIds.has(tipo.value)
            );
            
            console.log('Categorías encontradas en contexto:', Array.from(categoriasIds));
            console.log('Categorías filtradas:', categoriasFiltradas);
            
            setCategoriasDisponibles(categoriasFiltradas.length > 0 ? categoriasFiltradas : tiposRequisito);
          } else {
            // Si no hay configuraciones, mostrar todas las opciones
            setCategoriasDisponibles(tiposRequisito);
          }
        } catch (error) {
          console.error('Error filtrando categorías:', error);
          setCategoriasDisponibles(tiposRequisito);
        }
      } else {
        setCategoriasDisponibles(tiposRequisito);
      }
    } else {
      // Si no hay materia seleccionada, mostrar todas las categorías
      setCategoriasDisponibles(tiposRequisito);
    }
  }, [contexto.tipoMateria, contexto.ano, contexto.tipoProcesoElectoral,
      contexto.tipoEleccion, contexto.tipoExpediente, parametrosData, tiposRequisito]);

  // Efecto para autocompletar parámetros cuando se selecciona un requisito específico
  useEffect(() => {
    if (contexto.requisitoEspecifico && parametrosData) {
      // Verificar si todos los campos del contexto están completos
      const contextoCompleto = contexto.ano && contexto.tipoProcesoElectoral && 
                              contexto.tipoEleccion && contexto.tipoExpediente && 
                              contexto.tipoMateria && contexto.requisitoEspecifico;
      
      if (contextoCompleto) {
        const requisitoKey = contexto.requisitoEspecifico;
        
        // Guardar las modificaciones del requisito anterior si existe
        if (requisitoActualRef.current && parametros && parametrosModificados) {
          modificacionesPorRequisito.current[requisitoActualRef.current] = { ...parametros };
        }
        
        // Actualizar el requisito actual
        requisitoActualRef.current = requisitoKey;
        
        // Verificar si ya tenemos modificaciones guardadas para este requisito
        const modificacionGuardada = modificacionesPorRequisito.current[requisitoKey];
        
        if (modificacionGuardada) {
          // Usar las modificaciones guardadas
          setParametros(modificacionGuardada);
          setParametrosModificados(true);
        } else {
          // Cargar desde el backend
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
              parametrosValues,
              esSubsanable: configuracionContexto.esSubsanable
            });
            setParametrosModificados(false);
          } else {
            // No hay configuración para este contexto
            setParametros({
              categoriaRequisito: '',
              descripcionRequisito: '',
              obligatoriedad: 'obligatorio',
              nombreCriterio: 'cuerpo_lista',
              parametros: [],
              parametrosValues: {},
              esSubsanable: false
            });
            setParametrosModificados(false);
          }
        }
      }
    } else {
      // Reset cuando no hay requisito específico seleccionado
      setParametros(null);
      setParametrosModificados(false);
      requisitoActualRef.current = '';
    }
  }, [contexto.requisitoEspecifico, parametrosData, getConfiguracionFromDynamicData]);

  const handleContextoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setContexto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParametroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setParametrosModificados(true);
    setParametros(prev => prev ? ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }) : null);
  };

  const handleParametroValueChange = (parametroNombre: string, value: string | number) => {
    setParametrosModificados(true);
    setParametros(prev => prev ? ({
      ...prev,
      parametrosValues: {
        ...prev.parametrosValues,
        [parametroNombre]: value
      }
    }) : null);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParametrosModificados(true);
    if (name === 'nombreCriterio') {
      setParametros(prev => prev ? ({
        ...prev,
        [name]: value as 'cuerpo_lista' | 'lista_completa'
      }) : null);
    } else if (name === 'obligatoriedad') {
      setParametros(prev => prev ? ({
        ...prev,
        [name]: value as 'obligatorio' | 'opcional'
      }) : null);
    } else if (name === 'esSubsanable') {
      setParametros(prev => prev ? ({
        ...prev,
        esSubsanable: value === 'true'
      }) : null);
    } else {
      // Para radio buttons de parámetros individuales
      handleParametroValueChange(name, value);
    }
  };

  const isFormValid = () => {
    if (!contexto.requisitoEspecifico || !parametros || !parametros.categoriaRequisito || !parametros.descripcionRequisito.trim()) {
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

    // Get the TIPO_REQUISITO ID from the categoriaRequisito (which is now stored as string ID)
    const tipoRequisitoId = parseInt(parametros.categoriaRequisito);
    
    console.log('🔍 Mapping categoriaRequisito:', parametros.categoriaRequisito, 'to ID:', tipoRequisitoId);
    console.log('parametros: ', parametros)
    
    return {
      ANIO: parseInt(contexto.ano),
      TIPO_PROCESO: parseInt(tipoProceso.value),
      TIPO_ELECCION: parseInt(tipoEleccion.value),
      ID_TIPO_EXPEDIENTE: parseInt(tipoExpediente.value),
      ID_MATERIA: parseInt(tipoMateria.value),
      ID_REQUISITO: parseInt(requisitoEspecifico.value),
      TIPO_REQUISITO: tipoRequisitoId,
      DESCRIPCION: parametros.descripcionRequisito,
      CONF_PARAM: Object.keys(parametrosValues).length > 0 ? parametrosValues : {},
      ES_SUBSANABLE: parametros.esSubsanable ? 1 : 0
    };
  };

  const handleSaveConfiguration = async () => {
    if (!isFormValid()) return;
    
    setIsSaving(true);
    try {
      // Simular delay de red
      // await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Verificar que parametros no sea null
      if (!parametros) {
        throw new Error('No hay parámetros configurados');
      }
      
      // Generar objeto de salida según especificaciones
      const objetoSalida = generarObjetoSalida(contexto, parametros.parametrosValues, parametros);
      console.log('objetoSalida: ',objetoSalida)
      
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
    const currentValue = parametros?.parametrosValues?.[param.nombre] || param.valor;
    
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

  console.log('contexto: ', contexto)
  console.log('parametros: ', parametros)

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
                {/* Categoría del Requisito - Primero, se habilita cuando hay materia */}
                <Select
                  label="Categoría del requisito"
                  name="categoriaRequisito"
                  value={contexto.categoriaRequisito}
                  onChange={handleContextoChange}
                  options={categoriasDisponibles}
                  placeholder="Seleccione la categoría"
                  disabled={!contexto.tipoMateria || categoriasDisponibles.length === 0}
                  required
                />

                {/* Requisito Específico - Se filtra por categoría */}
                <Select
                  label="Requisito Específico"
                  name="requisitoEspecifico"
                  value={contexto.requisitoEspecifico}
                  onChange={handleContextoChange}
                  options={opcionesDisponibles.requisitosEspecificos}
                  placeholder="Seleccione el requisito específico"
                  disabled={!contexto.categoriaRequisito}
                  required
                />
                
                {/* Resto del bloque 2 - Solo se muestra si hay requisito seleccionado */}
                {showRestoBloques && (
                  <>
                    <Input
                      label="Descripción del Requisito"
                      name="descripcionRequisito"
                      value={parametros?.descripcionRequisito || ''}
                      onChange={handleParametroChange}
                      placeholder="Descripción detallada del requisito..."
                      required
                    />
                    {/* </div> */}

                    <RadioGroup
                      name="esSubsanable"
                      label="¿Es subsanable?"
                      value={parametros?.esSubsanable?.toString() || 'false'}
                      onChange={handleRadioChange}
                      options={[
                        { value: 'true', label: 'Sí' },
                        { value: 'false', label: 'No' }
                      ]}
                      required
                    />
                    
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
              {parametros?.parametros && parametros.parametros.length > 0 ? (
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
                    categoriaRequisito: '',
                    requisitoEspecifico: ''
                  });
                  setParametros(null);
                  setParametrosModificados(false);
                  modificacionesPorRequisito.current = {};
                  requisitoActualRef.current = '';
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