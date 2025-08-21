import { type SelectOption } from '../types';

export const TIPO_EXPEDIENTE_OPTIONS: SelectOption[] = [
  { value: '2', label: 'Acta Electoral' },
  { value: '1', label: 'Inscripción de Lista' },
  { value: '3', label: 'Publicidad Estatal' },
  { value: '4', label: 'Propaganda Electoral' },
  { value: '5', label: 'Nulidad Electoral' }
];

export const TIPO_MATERIA_OPTIONS: SelectOption[] = [
  { value: '1', label: 'Apelación' },
  { value: '5', label: 'Solicitud Inscripción de Lista' },
  { value: '2', label: 'Nulidad' },
  { value: '3', label: 'Tacha' },
  { value: '4', label: 'Vacancia' }
];

export const TIPO_PROCESO_OPTIONS: SelectOption[] = [
  { value: '', label: 'Todos' },
  { value: '1', label: 'Inscripción de Lista' },
  { value: '2', label: 'Acta Electoral' },
  { value: '3', label: 'Publicidad Estatal' },
  { value: '4', label: 'Propaganda Electoral' },
  { value: '5', label: 'Nulidad Electoral' }
];

export const MATERIA_OPTIONS: SelectOption[] = [
  { value: '', label: 'Todas' },
  { value: '5', label: 'Solicitud de Inscripción' },
  { value: '2', label: 'Apelación' },
  { value: '3', label: 'Nulidad' },
  { value: '4', label: 'Tacha' },
  { value: '1', label: 'Vacancia' }
];

export const ESTADO_OPTIONS: SelectOption[] = [
  { value: '', label: 'Todos' },
  { value: 'PENDIENTE', label: 'Pendiente' },
  { value: 'EN_PROCESO', label: 'En Proceso' },
  { value: 'COMPLETADO', label: 'Completado' }
];