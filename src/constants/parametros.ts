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