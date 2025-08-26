import { type SelectOption } from '../types';

// Años disponibles para selección
export const ANOS_DISPONIBLES: SelectOption[] = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' }
];

// Tipos de proceso electoral por año
export const TIPOS_PROCESO_ELECTORAL: Record<string, SelectOption[]> = {
  '2026': [
    { value: 'elecciones_generales', label: 'Elecciones Generales' },
    { value: 'elecciones_regionales', label: 'Elecciones Regionales y Municipales' }
  ],
  '2025': [
    { value: 'elecciones_complementarias', label: 'Elecciones Complementarias' },
    { value: 'referendum', label: 'Referéndum' }
  ],
  '2024': [
    { value: 'elecciones_primarias', label: 'Elecciones Primarias' }
  ],
  '2023': [
    { value: 'elecciones_generales', label: 'Elecciones Generales' },
    { value: 'elecciones_regionales', label: 'Elecciones Regionales y Municipales' }
  ],
  '2022': [
    { value: 'elecciones_regionales', label: 'Elecciones Regionales y Municipales' }
  ]
};

// Tipos de elección por proceso electoral
export const TIPOS_ELECCION: Record<string, SelectOption[]> = {
  'elecciones_generales': [
    { value: 'presidencial', label: 'Presidencial' },
    { value: 'congresales', label: 'Congresales' },
    { value: 'parlamento_andino', label: 'Parlamento Andino' }
  ],
  'elecciones_regionales': [
    { value: 'gobernador_regional', label: 'Gobernador Regional' },
    { value: 'consejeros_regionales', label: 'Consejeros Regionales' },
    { value: 'alcalde_provincial', label: 'Alcalde Provincial' },
    { value: 'regidores_provinciales', label: 'Regidores Provinciales' },
    { value: 'alcalde_distrital', label: 'Alcalde Distrital' },
    { value: 'regidores_distritales', label: 'Regidores Distritales' }
  ],
  'elecciones_complementarias': [
    { value: 'congresales', label: 'Congresales' },
    { value: 'alcalde_provincial', label: 'Alcalde Provincial' },
    { value: 'alcalde_distrital', label: 'Alcalde Distrital' }
  ],
  'referendum': [
    { value: 'nacional', label: 'Referéndum Nacional' },
    { value: 'regional', label: 'Referéndum Regional' },
    { value: 'municipal', label: 'Referéndum Municipal' }
  ],
  'elecciones_primarias': [
    { value: 'presidencial', label: 'Primarias Presidenciales' },
    { value: 'congresales', label: 'Primarias Congresales' }
  ]
};

// Tipos de expediente por tipo de elección
export const TIPOS_EXPEDIENTE: Record<string, SelectOption[]> = {
  'presidencial': [
    { value: 'inscripcion_candidatura', label: 'Inscripción de Candidatura' },
    { value: 'inscripcion_lista', label: 'Inscripción de Lista' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' },
    { value: 'exclusion_candidatos', label: 'Exclusión de Candidatos' }
  ],
  'congresales': [
    { value: 'inscripcion_lista', label: 'Inscripción de Lista' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' },
    { value: 'exclusion_candidatos', label: 'Exclusión de Candidatos' },
    { value: 'solicitud_accesitarios', label: 'Solicitud de Accesitarios' }
  ],
  'parlamento_andino': [
    { value: 'inscripcion_lista', label: 'Inscripción de Lista' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' }
  ],
  'gobernador_regional': [
    { value: 'inscripcion_candidatura', label: 'Inscripción de Candidatura' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' }
  ],
  'consejeros_regionales': [
    { value: 'inscripcion_lista', label: 'Inscripción de Lista' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' }
  ],
  'alcalde_provincial': [
    { value: 'inscripcion_candidatura', label: 'Inscripción de Candidatura' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' },
    { value: 'vacancia', label: 'Vacancia' }
  ],
  'regidores_provinciales': [
    { value: 'inscripcion_lista', label: 'Inscripción de Lista' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' }
  ],
  'alcalde_distrital': [
    { value: 'inscripcion_candidatura', label: 'Inscripción de Candidatura' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' },
    { value: 'vacancia', label: 'Vacancia' }
  ],
  'regidores_distritales': [
    { value: 'inscripcion_lista', label: 'Inscripción de Lista' },
    { value: 'tacha_candidatos', label: 'Tacha de Candidatos' }
  ],
  'nacional': [
    { value: 'convocatoria', label: 'Convocatoria a Referéndum' }
  ],
  'regional': [
    { value: 'convocatoria', label: 'Convocatoria a Referéndum' }
  ],
  'municipal': [
    { value: 'convocatoria', label: 'Convocatoria a Referéndum' }
  ]
};

// Tipos de materia por tipo de expediente
export const TIPOS_MATERIA: Record<string, SelectOption[]> = {
  'inscripcion_candidatura': [
    { value: 'requisitos_personales', label: 'Requisitos Personales' },
    { value: 'requisitos_legales', label: 'Requisitos Legales' },
    { value: 'documentacion_requerida', label: 'Documentación Requerida' }
  ],
  'inscripcion_lista': [
    { value: 'conformacion_lista', label: 'Conformación de Lista' },
    { value: 'requisitos_candidatos', label: 'Requisitos de Candidatos' },
    { value: 'documentacion_partidaria', label: 'Documentación Partidaria' },
    { value: 'cuota_genero', label: 'Cuota de Género' },
    { value: 'cuota_joven', label: 'Cuota Joven' },
    { value: 'cuota_indigena', label: 'Cuota Indígena' }
  ],
  'tacha_candidatos': [
    { value: 'causales_tacha', label: 'Causales de Tacha' },
    { value: 'procedimiento_tacha', label: 'Procedimiento de Tacha' },
    { value: 'plazos_tacha', label: 'Plazos para Tacha' }
  ],
  'exclusion_candidatos': [
    { value: 'causales_exclusion', label: 'Causales de Exclusión' },
    { value: 'procedimiento_exclusion', label: 'Procedimiento de Exclusión' }
  ],
  'solicitud_accesitarios': [
    { value: 'requisitos_accesitarios', label: 'Requisitos para Accesitarios' },
    { value: 'documentacion_accesitarios', label: 'Documentación de Accesitarios' }
  ],
  'vacancia': [
    { value: 'causales_vacancia', label: 'Causales de Vacancia' },
    { value: 'procedimiento_vacancia', label: 'Procedimiento de Vacancia' }
  ],
  'convocatoria': [
    { value: 'requisitos_convocatoria', label: 'Requisitos para Convocatoria' },
    { value: 'procedimiento_convocatoria', label: 'Procedimiento de Convocatoria' }
  ]
};

// Requisitos específicos por tipo de materia
export const REQUISITOS_ESPECIFICOS: Record<string, SelectOption[]> = {
  'conformacion_lista': [
    { value: 'numero_candidatos', label: 'Número mínimo y máximo de candidatos' },
    { value: 'orden_lista', label: 'Orden de candidatos en la lista' },
    { value: 'alternancia_genero', label: 'Alternancia de género' }
  ],
  'requisitos_candidatos': [
    { value: 'edad_minima', label: 'Edad mínima del candidato' },
    { value: 'ciudadania', label: 'Ciudadanía peruana' },
    { value: 'residencia', label: 'Residencia en la circunscripción' },
    { value: 'antecedentes', label: 'Antecedentes penales y judiciales' }
  ],
  'cuota_genero': [
    { value: 'porcentaje_mujeres', label: 'Porcentaje mínimo de mujeres' },
    { value: 'posiciones_alternadas', label: 'Posiciones alternadas por género' },
    { value: 'ubicacion_lista', label: 'Ubicación en posiciones expectantes' }
  ],
  'cuota_joven': [
    { value: 'porcentaje_jovenes', label: 'Porcentaje mínimo de jóvenes' },
    { value: 'edad_maxima', label: 'Edad máxima para cuota joven' },
    { value: 'distribucion_lista', label: 'Distribución en la lista' }
  ],
  'requisitos_personales': [
    { value: 'edad_minima', label: 'Edad mínima requerida' },
    { value: 'nivel_educativo', label: 'Nivel educativo mínimo' },
    { value: 'experiencia', label: 'Experiencia profesional o política' }
  ],
  'documentacion_partidaria': [
    { value: 'acreditacion_partido', label: 'Acreditación del partido político' },
    { value: 'designacion_candidatos', label: 'Designación de candidatos' },
    { value: 'estatutos_vigentes', label: 'Estatutos vigentes del partido' }
  ]
};

// Parámetros mock para evaluación de requisitos
export interface ParametroEvaluacion {
  nombreParametro: string;
  tipoValidacion: string;
  valorMinimo: string;
  valorMaximo: string;
  unidadMedida: string;
  tolerancia: string;
  aplicaExcepcion: boolean;
  descripcionExcepcion: string;
  nombreCriterio: 'cuerpo_lista' | 'lista_completa';
}

export const PARAMETROS_MOCK: Record<string, ParametroEvaluacion> = {
  'porcentaje_mujeres': {
    nombreParametro: 'Porcentaje mínimo de mujeres en la lista',
    tipoValidacion: 'Porcentaje',
    valorMinimo: '30',
    valorMaximo: '100',
    unidadMedida: '%',
    tolerancia: '5',
    aplicaExcepcion: true,
    descripcionExcepcion: 'Se aplica excepción para listas con menos de 5 candidatos',
    nombreCriterio: 'lista_completa'
  },
  'edad_minima': {
    nombreParametro: 'Edad mínima del candidato',
    tipoValidacion: 'Numérico',
    valorMinimo: '25',
    valorMaximo: '100',
    unidadMedida: 'años',
    tolerancia: '0',
    aplicaExcepcion: false,
    descripcionExcepcion: '',
    nombreCriterio: 'cuerpo_lista'
  },
  'numero_candidatos': {
    nombreParametro: 'Número de candidatos en la lista',
    tipoValidacion: 'Rango',
    valorMinimo: '1',
    valorMaximo: '130',
    unidadMedida: 'candidatos',
    tolerancia: '0',
    aplicaExcepcion: false,
    descripcionExcepcion: '',
    nombreCriterio: 'lista_completa'
  },
  'porcentaje_jovenes': {
    nombreParametro: 'Porcentaje mínimo de jóvenes',
    tipoValidacion: 'Porcentaje',
    valorMinimo: '20',
    valorMaximo: '100',
    unidadMedida: '%',
    tolerancia: '3',
    aplicaExcepcion: true,
    descripcionExcepcion: 'Aplica para listas de más de 10 candidatos',
    nombreCriterio: 'lista_completa'
  },
  'ciudadania': {
    nombreParametro: 'Verificación de ciudadanía peruana',
    tipoValidacion: 'Booleano',
    valorMinimo: '1',
    valorMaximo: '1',
    unidadMedida: 'sí/no',
    tolerancia: '0',
    aplicaExcepcion: false,
    descripcionExcepcion: '',
    nombreCriterio: 'cuerpo_lista'
  },
  'alternancia_genero': {
    nombreParametro: 'Alternancia de género en la lista',
    tipoValidacion: 'Patrón',
    valorMinimo: '1',
    valorMaximo: '1',
    unidadMedida: 'patrón',
    tolerancia: '0',
    aplicaExcepcion: true,
    descripcionExcepcion: 'Se permite excepción en el último tercio de la lista',
    nombreCriterio: 'lista_completa'
  }
};

// Tipos de validación disponibles
export const TIPOS_VALIDACION: SelectOption[] = [
  { value: 'Porcentaje', label: 'Porcentaje' },
  { value: 'Numérico', label: 'Numérico' },
  { value: 'Rango', label: 'Rango' },
  { value: 'Booleano', label: 'Booleano' },
  { value: 'Patrón', label: 'Patrón' },
  { value: 'Texto', label: 'Texto' }
];

// Unidades de medida
export const UNIDADES_MEDIDA: SelectOption[] = [
  { value: '%', label: '%' },
  { value: 'años', label: 'años' },
  { value: 'candidatos', label: 'candidatos' },
  { value: 'sí/no', label: 'sí/no' },
  { value: 'patrón', label: 'patrón' },
  { value: 'texto', label: 'texto' },
  { value: 'días', label: 'días' },
  { value: 'cantidad', label: 'cantidad' }
];