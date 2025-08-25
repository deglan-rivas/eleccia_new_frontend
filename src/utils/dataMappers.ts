import { type ExpedienteDetailData, type RequisitoData, type CandidatoData, type TabData } from '../types/expediente';

/**
 * Backend response interfaces - representing the actual API response structure
 */
export interface BackendExpedienteResponse {
  analisis_realizado: boolean;
  total_requisitos: number;
  requisitos_cumplidos: number;
  requisitos_faltantes: number;
  porcentaje_cumplimiento: number;
  mensaje_alerta?: string;
  tipo_resolucion?: string;
  motivo_resolucion?: string;
  analisis_resolucion?: string;
  nombre_expediente: string;
  tipo_expediente: string;
  materia: string;
  total_requisitos_lista: number;
  total_requisitos_candidatos: number;
  tabs: BackendTabData[];
}

export interface BackendTabData {
  id: string;
  nombre: string;
  requisitos?: BackendRequisitoData[];
  candidatos?: BackendCandidatoData[];
}

export interface BackendRequisitoData {
  id_estado_requisito: string;
  nombre: string;
  descripcion: string;
  observacion?: string;
  estado: string;
  estado_color: string;
  estado_texto: string;
  metodo_validacion: string;
  boton_accion?: string;
}

export interface BackendCandidatoData {
  dni: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  cumple: boolean;
  requisitos: BackendRequisitoData[];
}

/**
 * Maps backend requisito data to frontend RequisitoData
 */
export const mapRequisitoData = (backendRequisito: BackendRequisitoData): RequisitoData => {
  // Map backend estado to frontend estado
  let estado: RequisitoData['estado'];
  switch (backendRequisito.estado.toUpperCase()) {
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
      console.warn(`Unknown requisito estado: ${backendRequisito.estado}, defaulting to PARCIAL`);
      estado = 'PARCIAL';
  }

  // Map backend color to frontend color
  let estado_color: RequisitoData['estado_color'];
  switch (backendRequisito.estado_color.toLowerCase()) {
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
      console.warn(`Unknown color: ${backendRequisito.estado_color}, defaulting to yellow`);
      estado_color = 'yellow';
  }

  return {
    nombre: backendRequisito.nombre || '',
    estado,
    estado_texto: backendRequisito.estado_texto || estado,
    estado_color,
    descripcion: backendRequisito.descripcion || '',
    observacion: backendRequisito.observacion,
    metodo_validacion: backendRequisito.metodo_validacion || '',
    boton_accion: backendRequisito.boton_accion,
    id_estado_requisito: backendRequisito.id_estado_requisito || ''
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
    id: backendTab.id || '',
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
    tipo_expediente: backendData.tipo_expediente || '',
    materia: backendData.materia || '',
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