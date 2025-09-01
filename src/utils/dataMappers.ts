import { type ExpedienteDetailData, type RequisitoData, type CandidatoData, type TabData } from '../types/expediente';

/**
 * Backend response interfaces - representing the actual API response structure
 */
export interface BackendExpedienteResponse {
  total_requisitos: number;
  requisitos_cumplidos: number;
  requisitos_faltantes: number;
  porcentaje_cumplimiento: number;
  mensaje_alerta?: string;
  tipo_resolucion?: string;
  motivo_resolucion?: string;
  analisis_resolucion?: string;
  total_requisitos_lista?: number;
  total_requisitos_candidatos?: number;
  total_tabs?: number;
  tabs: BackendTabData[];
  numero_expediente?: string;
  nombre_expediente: string;
  tipo_expediente?: string;
  materia?: string;
  id_expediente?: number;
  codigo_resolucion?: string;
  fecha_calificacion?: string;
}

export interface BackendTabData {
  id: number | string;
  nombre: string;
  tipo?: string;
  requisitos?: BackendRequisitoData[];
  candidatos?: BackendCandidatoData[];
  total_requisitos?: number;
  requisitos_cumplidos?: number;
  porcentaje_cumplimiento?: number;
  total_candidatos?: number;
}

export interface BackendRequisitoData {
  id?: number;
  id_estado_requisito?: string;
  codigo?: string;
  nombre: string;
  descripcion?: string;
  observaciones?: string;
  observacion?: string;
  estado?: string;
  estado_codigo?: string;
  estado_color?: string;
  estado_texto?: string;
  metodo_validacion?: string;
  boton_accion?: string;
  es_obligatorio?: boolean;
  cumple?: boolean;
  archivo_ruta?: string | null;
  fecha_evaluacion?: string;
}

export interface BackendCandidatoData {
  id_candidato?: number;
  dni: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  numero_lista?: number;
  cumple?: boolean;
  requisitos: BackendRequisitoData[];
  total_requisitos?: number;
  requisitos_cumplidos?: number;
  porcentaje_cumplimiento?: number;
}

/**
 * Maps backend requisito data to frontend RequisitoData
 */
export const mapRequisitoData = (backendRequisito: BackendRequisitoData): RequisitoData => {
  // Safely get estado value with null check
  const estadoValue = backendRequisito.estado_codigo || backendRequisito.estado || '';
  
  // Map backend estado to frontend estado
  let estado: RequisitoData['estado'];
  switch (estadoValue.toUpperCase()) {
    case 'CUMPLE':
      estado = 'CUMPLE';
      break;
    case 'NO_CUMPLE':
    case 'NO CUMPLE':
      estado = 'NO_CUMPLE';
      break;
    case 'PARCIAL':
      estado = 'PARCIAL';
      break;
    case 'ALERTA':
      estado = 'ALERTA';
      break;
    default:
      console.warn(`Unknown requisito estado: ${estadoValue}, defaulting to PARCIAL`);
      estado = 'PARCIAL';
  }

  // Map estado to appropriate color if estado_color is not provided
  let estado_color: RequisitoData['estado_color'];
  const colorValue = backendRequisito.estado_color;
  
  if (colorValue) {
    switch (colorValue.toLowerCase()) {
      case 'green':
      case 'verde':
        estado_color = 'green';
        break;
      case 'red':
      case 'rojo':
        estado_color = 'red';
        break;
      case 'yellow':
      case 'amarillo':
      case 'amber':
        estado_color = 'yellow';
        break;
      default:
        estado_color = 'yellow';
    }
  } else {
    // Default colors based on estado
    switch (estado) {
      case 'CUMPLE':
        estado_color = 'green';
        break;
      case 'NO_CUMPLE':
        estado_color = 'red';
        break;
      case 'ALERTA':
        estado_color = 'yellow';
        break;
      default:
        estado_color = 'yellow';
    }
  }

  return {
    nombre: backendRequisito.nombre || '',
    estado,
    estado_texto: backendRequisito.estado_texto || estado,
    estado_color,
    descripcion: backendRequisito.descripcion || '',
    observacion: backendRequisito.observaciones || backendRequisito.observacion || '',
    metodo_validacion: backendRequisito.metodo_validacion || 'Validado por ELECCIA',
    boton_accion: backendRequisito.archivo_ruta || backendRequisito.boton_accion || '',
    id_estado_requisito: backendRequisito.id_estado_requisito || backendRequisito.id?.toString() || ''
  };
};

/**
 * Maps backend candidato data to frontend CandidatoData
 */
export const mapCandidatoData = (backendCandidato: BackendCandidatoData): CandidatoData => {
  return {
    dni: backendCandidato.dni || '',
    nombres: backendCandidato.nombres || '',
    apellidos: backendCandidato.apellidos || '',
    cargo: backendCandidato.cargo || '',
    cumple: backendCandidato.cumple || false,
    requisitos: (backendCandidato.requisitos || []).map(mapRequisitoData)
  };
};

/**
 * Maps backend tab data to frontend TabData
 */
export const mapTabData = (backendTab: BackendTabData): TabData => {
  return {
    id: backendTab.id?.toString() || '',
    nombre: backendTab.nombre || '',
    requisitos: backendTab.requisitos ? backendTab.requisitos.map(mapRequisitoData) : undefined,
    candidatos: backendTab.candidatos ? backendTab.candidatos.map(mapCandidatoData) : undefined
  };
};

/**
 * Maps complete backend expediente response to frontend ExpedienteDetailData
 */
export const mapExpedienteDetailData = (backendData: BackendExpedienteResponse): ExpedienteDetailData => {
  return {
    nombre_expediente: backendData.nombre_expediente || '',
    tipo_expediente: backendData.tipo_expediente || 'Inscripción de listas',
    materia: backendData.materia || 'Solicitud de inscripción',
    total_requisitos: backendData.total_requisitos || 0,
    total_requisitos_lista: backendData.total_requisitos_lista || 0,
    total_requisitos_candidatos: backendData.total_requisitos_candidatos || 0,
    requisitos_cumplidos: backendData.requisitos_cumplidos || 0,
    requisitos_faltantes: backendData.requisitos_faltantes || 0,
    porcentaje_cumplimiento: backendData.porcentaje_cumplimiento || 0,
    mensaje_alerta: backendData.mensaje_alerta || '',
    tipo_resolucion: backendData.tipo_resolucion || '',
    motivo_resolucion: backendData.motivo_resolucion || '',
    analisis_resolucion: backendData.analisis_resolucion || '',
    tabs: (backendData.tabs || []).map(mapTabData)
  };
};

/**
 * Validates that the backend response has the required fields
 */
export const validateBackendResponse = (data: unknown): data is BackendExpedienteResponse => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check required fields
  const requiredFields = [
    'nombre_expediente',
    'total_requisitos',
    'requisitos_cumplidos',
    'requisitos_faltantes',
    'porcentaje_cumplimiento'
  ];

  for (const field of requiredFields) {
    if (!(field in data)) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  return true;
};