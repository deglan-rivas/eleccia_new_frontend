import { type SelectOption } from '../types';

export const ANOS_DISPONIBLES: SelectOption[] = [
  { value: '2022', label: '2022' }
];

export const TIPOS_PROCESO_ELECTORAL: Record<string, SelectOption[]> = {
  '2022': [
    { value: 'elecciones_regionales', label: 'Elecciones Regionales y Municipales' } // 2
  ]
};

export const TIPOS_ELECCION: Record<string, SelectOption[]> = {
  'elecciones_regionales': [
    { value: 'municipal_provincial', label: 'Municipal Provincial' },
    { value: 'municipal_distrital', label: 'Municipal Distrital' }, // 6
    { value: 'constituyente', label: 'Constituyente' },
  ]
};

export const TIPOS_EXPEDIENTE: Record<string, SelectOption[]> = {
  // 'municipal_provincial': [
  //   { value: 'inscripcion_listas', label: 'Inscripción de Listas' }, // 1
  //   { value: 'publicidad_estatal', label: 'Publicidad Estatal' },
  //   { value: 'propaganda_electoral', label: 'Propaganda Electoral' },
  //   { value: 'acta_electoral', label: 'Acta Electoral' },
  //   { value: 'nulidad_electoral', label: 'Nulidad Electoral' }
  // ],
  'municipal_provincial': [
  ],
  'municipal_distrital': [
    { value: 'inscripcion_listas', label: 'Inscripción de Listas' },
    { value: 'publicidad_estatal', label: 'Publicidad Estatal' },
    { value: 'propaganda_electoral', label: 'Propaganda Electoral' },
    { value: 'acta_electoral', label: 'Acta Electoral' },
    { value: 'nulidad_electoral', label: 'Nulidad Electoral' }
  ],
  // 'constituyente': [
  //   { value: 'inscripcion_listas', label: 'Inscripción de Listas' },
  //   { value: 'publicidad_estatal', label: 'Publicidad Estatal' },
  //   { value: 'propaganda_electoral', label: 'Propaganda Electoral' },
  //   { value: 'acta_electoral', label: 'Acta Electoral' },
  //   { value: 'nulidad_electoral', label: 'Nulidad Electoral' }
  // ]
  'constituyente': [
  ]
};

export const TIPOS_MATERIA: Record<string, SelectOption[]> = {
  'inscripcion_listas': [
    { value: 'apelacion', label: 'Apelacion' },
    { value: 'exclusion_candidato', label: 'Exclusion candidato' },
    { value: 'exclusion_lista', label: 'Exclusion lista' },
    { value: 'queja_tramitacion', label: 'Queja tramitacion' },
    { value: 'solicitud_inscripcion', label: 'Solicitud inscripcion' }, // 5
    { value: 'tacha_candidato', label: 'Tacha candidato' },
    { value: 'tacha_lista', label: 'Tacha lista' },
    { value: 'renuncia_candidato', label: 'Renuncia candidato' },
    { value: 'retiro_candidato', label: 'Retiro candidato' }
  ]
};

// Requisitos específicos por tipo de materia
export const REQUISITOS_ESPECIFICOS: Record<string, SelectOption[]> = {
  'solicitud_inscripcion': [
    { value: 'acta_plazo', label: 'Acta plazo' },
    { value: 'ubigeo_electoral', label: 'Ubigeo electoral' },
    { value: 'acta_lista_candidatos', label: 'Acta lista candidatos' },
    { value: 'cantidad_regidores', label: 'Cantidad regidores' },
    { value: 'ubigeo_pg', label: 'Ubigeo pg' },
    { value: 'cuota_genero', label: 'Cuota genero' },
    { value: 'cuota_joven', label: 'Cuota joven' },
    { value: 'cuota_comunidad_campesina', label: 'Cuota comunidad campesina' },
    { value: 'paridad', label: 'Paridad' },
    { value: 'solicitud_inscripcion_firmada', label: 'Solicitud inscripcion firmada' },
    { value: 'comite_elec', label: 'Comite elec' },
    { value: 'comprobante_de_pago', label: 'Comprobante de pago' },
    { value: 'ubigeo_candidato', label: 'Ubigeo candidato' },
    { value: 'ddjj_consentimiento', label: 'Ddjj consentimiento' },
    { value: 'ddjj_no_deuda', label: 'Ddjj no deuda' },
    { value: 'ddjj_de_conciencia', label: 'Ddjj de conciencia' },
    { value: 'ddjj_de_renuncia', label: 'Ddjj de renuncia' },
    { value: 'ddjj_de_licencia', label: 'Ddjj de licencia' },
    { value: 'ddjj_domicilio_multiple', label: 'Ddjj domicilio multiple' },
    { value: 'ddjj_inscripcion_extranjero', label: 'Ddjj inscripcion extranjero' },
    { value: 'plan_gobierno', label: 'Plan gobierno' },
    { value: 'verifica_rop', label: 'Verifica rop' },
    { value: 'ddjj_plazo', label: 'Ddjj plazo' }
  ]
};

// Categorías de requisito
export const CATEGORIAS_REQUISITO: SelectOption[] = [
  { value: 'solicitud_inscripcion', label: 'Solicitud de Inscripción' },
  { value: 'acta_eleccion_interna', label: 'Acta de elección interna' },
  { value: 'hoja_vida_candidato', label: 'Hoja de vida de candidato' },
  { value: 'plan_gobierno', label: 'Plan de gobierno' }
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

// Esta variable es mutable para simular actualizaciones del backend
export const PARAMETROS_MOCK: Record<string, ParametroEvaluacion> = {
  'acta_plazo': {
    categoriaRequisito: 'acta_eleccion_interna',
    descripcionRequisito: 'Elección interna se realizó dentro del plazo establecido, de acuerdo a la modalidad empleada',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Días máximo de plazo',
        unidad: 'días',
        tipo: 'number',
        valor: 30,
        min: 1,
        max: 90
      },
      {
        nombre: 'Modalidad de elección',
        unidad: 'tipo',
        tipo: 'select',
        valor: 'presencial',
        opciones: [
          { value: 'presencial', label: 'Presencial' },
          { value: 'virtual', label: 'Virtual' },
          { value: 'mixta', label: 'Mixta' }
        ]
      },
      {
        nombre: 'Validar fecha límite',
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
  'ubigeo_electoral': {
    categoriaRequisito: 'acta_eleccion_interna',
    descripcionRequisito: 'El ubigeo electoral para el cual hace referencia el acta es igual al de la solicitud de inscripción',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Validación estricta',
        unidad: 'nivel',
        tipo: 'select',
        valor: 'completo',
        opciones: [
          { value: 'completo', label: 'Validación completa (6 dígitos)' },
          { value: 'parcial', label: 'Validación parcial (4 dígitos)' },
          { value: 'departamento', label: 'Solo departamento (2 dígitos)' }
        ]
      },
      {
        nombre: 'Permitir corrección',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'no',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      }
    ]
  },
  'acta_lista_candidatos': {
    categoriaRequisito: 'acta_eleccion_interna',
    descripcionRequisito: 'La lista de candidatos consignada en el acta electoral debe coincidir de forma exacta con la lista de candidatos presentada en la solicitud de inscripción.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Tolerancia en nombres',
        unidad: 'caracteres',
        tipo: 'number',
        valor: 0,
        min: 0,
        max: 5
      },
      {
        nombre: 'Validar orden de lista',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Tipo de coincidencia',
        unidad: 'nivel',
        tipo: 'select',
        valor: 'exacta',
        opciones: [
          { value: 'exacta', label: 'Coincidencia exacta' },
          { value: 'similar', label: 'Coincidencia similar' },
          { value: 'flexible', label: 'Coincidencia flexible' }
        ]
      }
    ]
  },
  'cantidad_regidores': {
    categoriaRequisito: 'solicitud_inscripcion',
    descripcionRequisito: 'Se valida que la lista cumpla con la cantidad de regidores para el ubigeo al que está postulando.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Cantidad mínima',
        unidad: 'regidores',
        tipo: 'number',
        valor: 5,
        min: 1,
        max: 15
      },
      {
        nombre: 'Cantidad máxima',
        unidad: 'regidores',
        tipo: 'number',
        valor: 15,
        min: 5,
        max: 30
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
  'ubigeo_pg': {
    categoriaRequisito: 'plan_gobierno',
    descripcionRequisito: 'El ubigeo del plan de gobierno concuerda con el ubigeo de postulación.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Nivel de validación',
        unidad: 'tipo',
        tipo: 'select',
        valor: 'exacto',
        opciones: [
          { value: 'exacto', label: 'Coincidencia exacta' },
          { value: 'regional', label: 'Mismo departamento' },
          { value: 'provincial', label: 'Misma provincia' }
        ]
      },
      {
        nombre: 'Validar anexos',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'no',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      }
    ]
  },
  'cuota_genero': {
    categoriaRequisito: 'solicitud_inscripcion',
    descripcionRequisito: 'Al menos el 50% de los participantes en las listas electorales deben ser hombres o mujeres, si la lista es impar se permitirá máximo la diferencia de 1.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Porcentaje mínimo',
        unidad: '%',
        tipo: 'number',
        valor: 50,
        min: 30,
        max: 70
      },
      {
        nombre: 'Tolerancia para listas impares',
        unidad: 'candidatos',
        tipo: 'number',
        valor: 1,
        min: 0,
        max: 2
      },
      {
        nombre: 'Aplicar a accesitarios',
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
  'cuota_joven': {
    categoriaRequisito: 'solicitud_inscripcion',
    descripcionRequisito: 'Mínimo 20% de los candidatos entre los 18 y 29 años.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Porcentaje mínimo',
        unidad: '%',
        tipo: 'number',
        valor: 20,
        min: 15,
        max: 30
      },
      {
        nombre: 'Edad mínima',
        unidad: 'años',
        tipo: 'number',
        valor: 18,
        min: 18,
        max: 21
      },
      {
        nombre: 'Edad máxima',
        unidad: 'años',
        tipo: 'number',
        valor: 29,
        min: 25,
        max: 35
      },
      {
        nombre: 'Fecha de referencia',
        unidad: 'momento',
        tipo: 'select',
        valor: 'inscripcion',
        opciones: [
          { value: 'inscripcion', label: 'Fecha de inscripción' },
          { value: 'eleccion', label: 'Fecha de elección' },
          { value: 'juramentacion', label: 'Fecha de juramentación' }
        ]
      }
    ]
  },
  'cuota_comunidad_campesina': {
    categoriaRequisito: 'requisitos_lista',
    descripcionRequisito: 'Mínimo 15% si pertenece a una zona de comunidad campesina.',
    obligatoriedad: 'opcional',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Porcentaje mínimo',
        unidad: '%',
        tipo: 'number',
        valor: 15,
        min: 10,
        max: 25
      },
      {
        nombre: 'Aplicar solo si aplica',
        unidad: 'condición',
        tipo: 'select',
        valor: 'zona_rural',
        opciones: [
          { value: 'zona_rural', label: 'Solo en zonas rurales' },
          { value: 'siempre', label: 'Siempre aplicar' },
          { value: 'por_ubigeo', label: 'Según ubigeo específico' }
        ]
      },
      {
        nombre: 'Documentación requerida',
        unidad: 'tipo',
        tipo: 'select',
        valor: 'certificado',
        opciones: [
          { value: 'certificado', label: 'Certificado de comunidad' },
          { value: 'declaracion', label: 'Declaración jurada' },
          { value: 'ambos', label: 'Ambos documentos' }
        ]
      }
    ]
  },
  'paridad': {
    categoriaRequisito: 'solicitud_inscripcion',
    descripcionRequisito: 'Lista debe cumplir con alternancia (hombre y mujer o mujer y hombre).',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Patrón de alternancia',
        unidad: 'tipo',
        tipo: 'select',
        valor: 'estricto',
        opciones: [
          { value: 'estricto', label: 'Alternancia estricta' },
          { value: 'bloques_2', label: 'Por bloques de 2' },
          { value: 'flexible', label: 'Alternancia flexible' }
        ]
      },
      {
        nombre: 'Inicio de lista',
        unidad: 'género',
        tipo: 'select',
        valor: 'cualquiera',
        opciones: [
          { value: 'cualquiera', label: 'Cualquier género' },
          { value: 'femenino', label: 'Debe iniciar mujer' },
          { value: 'masculino', label: 'Debe iniciar hombre' }
        ]
      },
      {
        nombre: 'Excepción último tercio',
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
  'solicitud_inscripcion_firmada': {
    categoriaRequisito: 'solicitud_inscripcion',
    descripcionRequisito: 'Documento debe estar firmado por el personero legal.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Validar firma digital',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'no',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Tipo de firma aceptada',
        unidad: 'modalidad',
        tipo: 'select',
        valor: 'ambas',
        opciones: [
          { value: 'fisica', label: 'Solo firma física' },
          { value: 'digital', label: 'Solo firma digital' },
          { value: 'ambas', label: 'Ambas modalidades' }
        ]
      }
    ]
  },
  'comite_elec': {
    categoriaRequisito: 'acta_eleccion_interna',
    descripcionRequisito: 'Debe contener Nombres, apellidos, números de DNI y firmas de los miembros del comité electoral (3 miembros) inscritos en el ROP.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Número de miembros',
        unidad: 'personas',
        tipo: 'number',
        valor: 3,
        min: 3,
        max: 5
      },
      {
        nombre: 'Validar inscripción ROP',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Campos obligatorios',
        unidad: 'nivel',
        tipo: 'select',
        valor: 'completos',
        opciones: [
          { value: 'basicos', label: 'Solo nombres y DNI' },
          { value: 'completos', label: 'Nombres, DNI y firmas' },
          { value: 'extendidos', label: 'Todos los campos' }
        ]
      }
    ]
  },
  'comprobante_de_pago': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'Se debe adjuntar comprobante de pago que cumpla con la tasa correspondiente, el cual no debe estar en uso en otro proceso.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Monto mínimo',
        unidad: 'soles',
        tipo: 'number',
        valor: 1000,
        min: 500,
        max: 5000
      },
      {
        nombre: 'Días de vigencia',
        unidad: 'días',
        tipo: 'number',
        valor: 30,
        min: 15,
        max: 60
      },
      {
        nombre: 'Validar duplicado',
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
  'ubigeo_candidato': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'El domicilio del candidato corresponde al ubigeo al que postula y debe acreditar 2 años de residencia.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Años de residencia mínima',
        unidad: 'años',
        tipo: 'number',
        valor: 2,
        min: 1,
        max: 5
      },
      {
        nombre: 'Tipo de documento aceptado',
        unidad: 'modalidad',
        tipo: 'select',
        valor: 'cualquiera',
        opciones: [
          { value: 'recibo_servicio', label: 'Solo recibos de servicio' },
          { value: 'certificado', label: 'Solo certificado domiciliario' },
          { value: 'cualquiera', label: 'Cualquier documento válido' }
        ]
      },
      {
        nombre: 'Validar correspondencia exacta',
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
  'ddjj_consentimiento': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'Declaración jurada de consentimiento de participación',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Formato requerido',
        unidad: 'tipo',
        tipo: 'select',
        valor: 'oficial',
        opciones: [
          { value: 'oficial', label: 'Solo formato oficial' },
          { value: 'libre', label: 'Formato libre' },
          { value: 'ambos', label: 'Cualquier formato válido' }
        ]
      },
      {
        nombre: 'Firma requerida',
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
  'ddjj_no_deuda': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'Declaración jurada de no tener deuda de reparación civil',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Validar con sistema judicial',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'no',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Vigencia máxima',
        unidad: 'días',
        tipo: 'number',
        valor: 90,
        min: 30,
        max: 180
      }
    ]
  },
  'ddjj_de_conciencia': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada de conciencia del candidato según normativa electoral',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Formato requerido',
        unidad: 'tipo',
        tipo: 'select',
        valor: 'pdf_firmado',
        opciones: [
          { value: 'pdf_firmado', label: 'PDF con firma digital' },
          { value: 'documento_fisico', label: 'Documento físico escaneado' },
          { value: 'ambos', label: 'Ambos formatos' }
        ]
      },
      {
        nombre: 'Validar formato',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Obligatorio para todos',
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
  'ddjj_de_renuncia': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada de renuncia a cargos incompatibles con la postulación',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Días antes del plazo',
        unidad: 'días',
        tipo: 'number',
        valor: 15,
        min: 1,
        max: 60
      },
      {
        nombre: 'Validar cargos específicos',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Incluir sector privado',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'no',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      }
    ]
  },
  'ddjj_de_licencia': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada de licencia sin goce de haber para funcionarios públicos',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Tiempo mínimo de licencia',
        unidad: 'meses',
        tipo: 'number',
        valor: 3,
        min: 1,
        max: 12
      },
      {
        nombre: 'Incluir beneficios',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'no',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Validar fecha efectiva',
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
  'ddjj_domicilio_multiple': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada para candidatos con múltiples domicilios que especifique el domicilio electoral',
    obligatoriedad: 'opcional',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Máximo domicilios permitidos',
        unidad: 'cantidad',
        tipo: 'number',
        valor: 3,
        min: 2,
        max: 5
      },
      {
        nombre: 'Validar domicilio electoral',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Coincidencia con DNI',
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
  'ddjj_inscripcion_extranjero': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada de inscripción en el registro electoral para ciudadanos extranjeros naturalizados',
    obligatoriedad: 'opcional',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Años mínimos de naturalización',
        unidad: 'años',
        tipo: 'number',
        valor: 5,
        min: 1,
        max: 10
      },
      {
        nombre: 'Validar certificado de naturalización',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Verificar registro electoral',
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
  'plan_gobierno': {
    categoriaRequisito: 'plan_gobierno',
    descripcionRequisito: 'Se valida que el Plan de Gobierno y el Resumen del Plan de Gobierno tengan concordancia',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Porcentaje mínimo concordancia',
        unidad: '%',
        tipo: 'number',
        valor: 80,
        min: 60,
        max: 100
      },
      {
        nombre: 'Validar estructura',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Secciones obligatorias',
        unidad: 'cantidad',
        tipo: 'number',
        valor: 5,
        min: 3,
        max: 10
      }
    ]
  },
  'verifica_rop': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'Se valida si el candidato se encuentra inscrito al ROP',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Estado requerido en ROP',
        unidad: 'estado',
        tipo: 'select',
        valor: 'activo',
        opciones: [
          { value: 'activo', label: 'Solo activos' },
          { value: 'cualquiera', label: 'Cualquier estado' },
          { value: 'habilitado', label: 'Solo habilitados' }
        ]
      },
      {
        nombre: 'Validación automática',
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
  'ddjj_plazo': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'La Hoja de Vida deberá presentarse firmada por el personero legal. Las Declaraciones Juradas de Consentimiento y de No Deuda por Reparación Civil deberán presentarse en la misma fecha o después de la Hoja de Vida, no antes.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
      {
        nombre: 'Días máximo después de HV',
        unidad: 'días',
        tipo: 'number',
        valor: 5,
        min: 0,
        max: 15
      },
      {
        nombre: 'Validar orden cronológico',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        nombre: 'Permitir misma fecha',
        unidad: 'sí/no',
        tipo: 'radio',
        valor: 'sí',
        opciones: [
          { value: 'sí', label: 'Sí' },
          { value: 'no', label: 'No' }
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

// Función para actualizar parámetros mock (simula actualización del backend)
export const updateParametrosMock = (
  requisitoId: string, 
  parametrosActualizados: ParametroEvaluacion
): void => {
  if (PARAMETROS_MOCK[requisitoId]) {
    PARAMETROS_MOCK[requisitoId] = { ...parametrosActualizados };
  }
};

// Función para obtener parámetros mock (simula consulta al backend)
export const getParametrosMock = (requisitoId: string): ParametroEvaluacion | null => {
  return PARAMETROS_MOCK[requisitoId] || null;
};