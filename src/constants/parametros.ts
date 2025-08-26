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

// Categorías de requisito
export const CATEGORIAS_REQUISITO: SelectOption[] = [
  { value: 'requisitos_lista', label: 'Requisitos de Lista' },
  { value: 'requisitos_candidato', label: 'Requisitos de Candidato' }
];

// Opciones de obligatoriedad
export const OPCIONES_OBLIGATORIEDAD = [
  { value: 'obligatorio', label: 'Obligatorio' },
  { value: 'opcional', label: 'Opcional' }
];

// Parámetros mock para evaluación de requisitos
export interface ParametroEvaluacion {
  categoriaRequisito: string;
  descripcionRequisito: string;
  obligatoriedad: 'obligatorio' | 'opcional';
  nombreCriterio: 'cuerpo_lista' | 'lista_completa';
  parametros: ParametroIndividual[];
}

export interface ParametroIndividual {
  nombre: string;
  unidad: string;
  tipo: 'number' | 'select' | 'radio';
  valor: string | number;
  opciones?: SelectOption[]; // Para selects y radios
  min?: number; // Para inputs numéricos
  max?: number; // Para inputs numéricos
}

export const PARAMETROS_MOCK: Record<string, ParametroEvaluacion> = {
  'porcentaje_mujeres': {
    categoriaRequisito: 'requisitos_lista',
    descripcionRequisito: 'Evaluación del cumplimiento de cuota de género femenino en la conformación de la lista electoral',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Porcentaje mínimo',
        unidad: '%',
        tipo: 'number',
        valor: 30,
        min: 0,
        max: 100
      },
      {
        nombre: 'Tolerancia permitida',
        unidad: '%',
        tipo: 'number',
        valor: 5,
        min: 0,
        max: 10
      },
      {
        nombre: 'Aplica excepción',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      }
    ]
  },
  'edad_minima': {
    categoriaRequisito: 'requisitos_candidato',
    descripcionRequisito: 'Verificación de que todos los candidatos cumplan con la edad mínima establecida para el cargo',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Edad mínima requerida',
        unidad: 'años',
        tipo: 'number',
        valor: 25,
        min: 18,
        max: 100
      },
      {
        nombre: 'Fecha de referencia',
        unidad: 'momento',
        tipo: 'select',
        valor: 'inscripcion',
        opciones: [
          { value: 'inscripcion', label: 'Al momento de inscripción' },
          { value: 'eleccion', label: 'Al día de la elección' },
          { value: 'juramentacion', label: 'Al día de juramentación' }
        ]
      }
    ]
  },
  'numero_candidatos': {
    categoriaRequisito: 'requisitos_lista',
    descripcionRequisito: 'Control del número total de candidatos que debe contener la lista electoral según el tipo de elección',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Número mínimo',
        unidad: 'candidatos',
        tipo: 'number',
        valor: 1,
        min: 1,
        max: 200
      },
      {
        nombre: 'Número máximo',
        unidad: 'candidatos',
        tipo: 'number',
        valor: 130,
        min: 1,
        max: 200
      },
      {
        nombre: 'Incluir accesitarios',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      }
    ]
  },
  'porcentaje_jovenes': {
    categoriaRequisito: 'requisitos_lista',
    descripcionRequisito: 'Evaluación del cumplimiento de cuota joven en la conformación de la lista electoral',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Porcentaje mínimo',
        unidad: '%',
        tipo: 'number',
        valor: 20,
        min: 0,
        max: 100
      },
      {
        nombre: 'Edad máxima joven',
        unidad: 'años',
        tipo: 'number',
        valor: 29,
        min: 18,
        max: 40
      },
      {
        nombre: 'Aplica solo si',
        unidad: 'candidatos mínimos',
        tipo: 'select',
        valor: '10',
        opciones: [
          { value: '5', label: 'Lista tiene más de 5 candidatos' },
          { value: '10', label: 'Lista tiene más de 10 candidatos' },
          { value: '15', label: 'Lista tiene más de 15 candidatos' }
        ]
      }
    ]
  },
  'ciudadania': {
    categoriaRequisito: 'requisitos_candidato',
    descripcionRequisito: 'Verificación de ciudadanía peruana por nacimiento o naturalización de todos los candidatos',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Tipo de ciudadanía',
        unidad: 'modalidad',
        tipo: 'select',
        valor: 'ambas',
        opciones: [
          { value: 'nacimiento', label: 'Solo por nacimiento' },
          { value: 'naturalizacion', label: 'Solo por naturalización' },
          { value: 'ambas', label: 'Ambas modalidades' }
        ]
      },
      {
        nombre: 'Documento válido',
        unidad: 'tipo',
        tipo: 'select',
        valor: 'dni',
        opciones: [
          { value: 'dni', label: 'DNI' },
          { value: 'cedula', label: 'Cédula de identidad' },
          { value: 'pasaporte', label: 'Pasaporte peruano' }
        ]
      }
    ]
  },
  'alternancia_genero': {
    categoriaRequisito: 'requisitos_lista',
    descripcionRequisito: 'Verificación del patrón de alternancia de género en la secuencia de candidatos de la lista',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Patrón requerido',
        unidad: 'modalidad',
        tipo: 'select',
        valor: 'intercalado',
        opciones: [
          { value: 'intercalado', label: 'Intercalado (H-M-H-M...)' },
          { value: 'bloques', label: 'Por bloques de 2' },
          { value: 'bloques3', label: 'Por bloques de 3' }
        ]
      },
      {
        nombre: 'Excepción en último tercio',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Inicio de patrón',
        unidad: 'género',
        tipo: 'select',
        valor: 'cualquiera',
        opciones: [
          { value: 'masculino', label: 'Debe iniciar con hombre' },
          { value: 'femenino', label: 'Debe iniciar con mujer' },
          { value: 'cualquiera', label: 'Puede iniciar con cualquiera' }
        ]
      }
    ]
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