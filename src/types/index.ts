// Common types used across the application

export interface ExpedienteFormData {
  num_expediente: string;
  tipo_expediente: string;
  tipo_materia: string;
}

export interface FilterData {
  num_expediente: string;
  tipo_proceso: string;
  materia: string;
  fecha_desde: string;
  fecha_hasta: string;
  estado: string;
}

export interface ProcessData {
  id_expediente: string;
  nombre_expediente: string;
  tipo_proceso: string;
  materia: string;
  fecha_creacion: string;
  usuario: string;
  estado: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO';
  archivo_resolucion?: string;
  id_resolucion?: string;
}

export interface PaginationData {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  has_prev: boolean;
  has_next: boolean;
}

export interface DashboardData {
  procesos: ProcessData[];
  pagination: PaginationData;
}

export interface ExpedienteAnalysis {
  documentos_analizados: number;
  requisitos_cumplidos: number;
  requisitos_total: number;
  observaciones: string[];
  recomendacion: string;
}

export interface ExpedienteData {
  id_expediente: string;
  nombre_expediente: string;
  tipo_proceso: string;
  materia: string;
  fecha_creacion: string;
  estado: string;
  usuario: string;
  analisis?: ExpedienteAnalysis;
}

export interface ResolucionData {
  id: string;
  numero: string;
  fecha: string;
  estado: 'APROBADO' | 'EN_REVISION' | 'RECHAZADO';
  archivo?: string;
  observaciones?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ApiError {
  detail: string;
  status: number;
}