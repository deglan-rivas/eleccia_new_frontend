/**
 * Types for resolution management system
 */

export interface ResolutionData {
  id_resolucion: number;
  codigo_resolucion: string;
  tipo_resolucion: string | null;
  total_requisitos: number;
  requisitos_cumplidos: number;
  requisitos_faltantes: number;
  archivo_resolucion: string | null;
  usuario_asignado: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  estado: 'PENDIENTE' | 'COMPLETADA';
}

export interface ResolutionListResponse {
  expediente: string;
  id_expediente: number;
  resoluciones: ResolutionData[];
  total_resoluciones: number;
}

// Frontend-specific interfaces for display
export interface FormattedResolutionData {
  id: number;
  codigo: string;
  tipoResolucion: string;
  usuario: string;
  estado: 'PENDIENTE' | 'COMPLETADA';
  estadoBadge: {
    text: string;
    color: 'yellow' | 'green' | 'red' | 'gray';
  };
  fechaCreacion: string;
  fechaModificacion: string;
  archivoDisponible: boolean;
  archivoNombre?: string;
  estadisticas: {
    totalRequisitos: number;
    cumplidos: number;
    faltantes: number;
    porcentajeCumplimiento: number;
  };
}

export interface ExpedienteInfo {
  codigo: string;
  id: number;
  totalResoluciones: number;
}