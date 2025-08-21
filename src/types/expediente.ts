// Extended types for the expediente detail functionality

export interface RequisitoData {
  nombre: string;
  estado: 'CUMPLE' | 'NO_CUMPLE' | 'PARCIAL';
  estado_texto: string;
  estado_color: 'green' | 'red' | 'yellow';
  descripcion: string;
  observacion?: string;
  metodo_validacion: string;
  boton_accion?: string;
  id_estado_requisito: string;
}

export interface CandidatoData {
  nombres: string;
  apellidos: string;
  dni: string;
  cargo: string;
  cumple: boolean;
  requisitos: RequisitoData[];
}

export interface TabData {
  id: string;
  nombre: string;
  requisitos?: RequisitoData[];
  candidatos?: CandidatoData[];
}

export interface ExpedienteDetailData {
  nombre_expediente: string;
  tipo_expediente: string;
  materia: string;
  total_requisitos: number;
  total_requisitos_lista: number;
  total_requisitos_candidatos: number;
  requisitos_cumplidos: number;
  requisitos_faltantes: number;
  porcentaje_cumplimiento: number;
  mensaje_alerta?: string;
  tipo_resolucion: string;
  motivo_resolucion: string;
  analisis_resolucion: string;
  tabs: TabData[];
}