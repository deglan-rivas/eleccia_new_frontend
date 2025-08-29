import { type SelectOption } from '../types';

// Mapeos de IDs según especificaciones del backend
export const ID_MAPPINGS = {
  ANOS: {
    '2022': 2022
  },
  TIPOS_PROCESO: {
    'elecciones_regionales': 2
  },
  TIPOS_ELECCION: {
    'municipal_provincial': 7,
    'municipal_distrital': 6, // ID diferente según especificaciones
    'constituyente': 8 // ID diferente según especificaciones
  },
  TIPOS_EXPEDIENTE: {
    'inscripcion_listas': 1,
    'publicidad_estatal': 2, // Asumir, corregir si es diferente
    'propaganda_electoral': 3, // Asumir, corregir si es diferente
    'acta_electoral': 4, // Asumir, corregir si es diferente
    'nulidad_electoral': 5 // Asumir, corregir si es diferente
  },
  TIPOS_MATERIA: {
    'solicitud_inscripcion': 5,
    'apelacion': 1, // Asumir, corregir si es diferente
    'exclusion_candidato': 2, // Asumir, corregir si es diferente
    'exclusion_lista': 3, // Asumir, corregir si es diferente
    'queja_tramitacion': 4, // Asumir, corregir si es diferente
    'tacha_candidato': 6, // Asumir, corregir si es diferente
    'tacha_lista': 7, // Asumir, corregir si es diferente
    'renuncia_candidato': 8, // Asumir, corregir si es diferente
    'retiro_candidato': 9 // Asumir, corregir si es diferente
  },
  REQUISITOS: {
    'acta_plazo': 6,
    'ubigeo_electoral': 7,
    'acta_lista_candidatos': 8,
    'cantidad_regidores': 20,
    'ubigeo_pg': 22,
    'cuota_genero': 1,
    'cuota_joven': 2,
    'cuota_comunidad_campesina': 3,
    'paridad': 4,
    'solicitud_inscripcion_firmada': 5,
    'comite_elec': 23,
    'comprobante_de_pago': 9,
    'ubigeo_candidato': 10,
    'ddjj_consentimiento': 11,
    'ddjj_no_deuda': 12,
    'ddjj_de_conciencia': 13,
    'ddjj_de_renuncia': 14,
    'ddjj_de_licencia': 15,
    'ddjj_domicilio_multiple': 16,
    'ddjj_inscripcion_extranjero': 17,
    'plan_gobierno': 18,
    'verifica_rop': 19,
    'ddjj_plazo': 21
  },
  CATEGORIAS_REQUISITO: {
    'solicitud_inscripcion': 1,
    'acta_eleccion_interna': 2,
    'hoja_vida_candidato': 3,
    'plan_gobierno': 4
  }
};

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
  'municipal_provincial': [
    { value: 'inscripcion_listas', label: 'Inscripción de Listas' }, // 1
    { value: 'publicidad_estatal', label: 'Publicidad Estatal' },
    { value: 'propaganda_electoral', label: 'Propaganda Electoral' },
    { value: 'acta_electoral', label: 'Acta Electoral' },
    { value: 'nulidad_electoral', label: 'Nulidad Electoral' }
  ],
  // 'municipal_provincial': [
  // ],
  'municipal_distrital': [
    { value: 'inscripcion_listas', label: 'Inscripción de Listas' },
    { value: 'publicidad_estatal', label: 'Publicidad Estatal' },
    { value: 'propaganda_electoral', label: 'Propaganda Electoral' },
    { value: 'acta_electoral', label: 'Acta Electoral' },
    { value: 'nulidad_electoral', label: 'Nulidad Electoral' }
  ],
  'constituyente': [
    { value: 'inscripcion_listas', label: 'Inscripción de Listas' },
    { value: 'publicidad_estatal', label: 'Publicidad Estatal' },
    { value: 'propaganda_electoral', label: 'Propaganda Electoral' },
    { value: 'acta_electoral', label: 'Acta Electoral' },
    { value: 'nulidad_electoral', label: 'Nulidad Electoral' }
  ]
  // 'constituyente': [
  // ]
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
        nombre: 'Modalidad',
        unidad: 'tipo',
        tipo: 'select',
        valor: 'delegados',
        opciones: [
          { value: 'delegados', label: 'Delegados' },
          { value: 'afiliados', label: 'Afiliados' }
        ]
      },
      {
        nombre: 'Fecha límite',
        unidad: 'dd/mm/yyyy',
        tipo: 'number',
        valor: 20,
        min: 0,
        max: 50
      }
    ]
  },
  'ubigeo_electoral': {
    categoriaRequisito: 'acta_eleccion_interna',
    descripcionRequisito: 'El ubigeo electoral para el cual hace referencia el acta es igual al de la solicitud de inscripción',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
    ]
  },
  'acta_lista_candidatos': {
    categoriaRequisito: 'acta_eleccion_interna',
    descripcionRequisito: 'La lista de candidatos consignada en el acta electoral debe coincidir de forma exacta con la lista de candidatos presentada en la solicitud de inscripción.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
    ]
  },
  'cantidad_regidores': {
    categoriaRequisito: 'solicitud_inscripcion',
    descripcionRequisito: 'Se valida que la lista cumpla con la cantidad de regidores para el ubigeo al que está postulando.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Modo de Aplicación',
        unidad: '',
        tipo: 'radio',
        valor: 'cuerpo_lista',
        opciones: [
          { value: 'cuerpo_lista', label: 'Cuerpo de Lista' },
          { value: 'lista_completa', label: 'Lista Completa' }
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
    ]
  },
  'cuota_genero': {
    categoriaRequisito: 'solicitud_inscripcion',
    descripcionRequisito: 'Al menos el 50% de los participantes en las listas electorales deben ser hombres o mujeres, si la lista es impar se permitirá máximo la diferencia de 1.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Modo de Aplicación',
        unidad: '',
        tipo: 'radio',
        valor: 'cuerpo_lista',
        opciones: [
          { value: 'cuerpo_lista', label: 'Cuerpo de Lista' },
          { value: 'lista_completa', label: 'Lista Completa' }
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
        nombre: 'Porcentaje de cumplimiento',
        unidad: '%',
        tipo: 'number',
        valor: 20,
        min: 1,
        max: 100
      },
      {
        nombre: 'Modo de Aplicación',
        unidad: '',
        tipo: 'radio',
        valor: 'cuerpo_lista',
        opciones: [
          { value: 'cuerpo_lista', label: 'Cuerpo de Lista' },
          { value: 'lista_completa', label: 'Lista Completa' }
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
        min: 1,
        max: 100
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
        nombre: 'Modo de Aplicación',
        unidad: '',
        tipo: 'radio',
        valor: 'cuerpo_lista',
        opciones: [
          { value: 'cuerpo_lista', label: 'Cuerpo de Lista' },
          { value: 'lista_completa', label: 'Lista Completa' }
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
        nombre: 'Modo de Aplicación',
        unidad: '',
        tipo: 'radio',
        valor: 'cuerpo_lista',
        opciones: [
          { value: 'cuerpo_lista', label: 'Cuerpo de Lista' },
          { value: 'lista_completa', label: 'Lista Completa' }
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
    ]
  },
  'comprobante_de_pago': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'Se debe adjuntar comprobante de pago que cumpla con la tasa correspondiente, el cual no debe estar en uso en otro proceso.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
      {
        nombre: 'Monto',
        unidad: 'soles',
        tipo: 'number',
        valor: 1000,
        min: 500,
        max: 10000
      },
      {
        nombre: 'Tasa',
        unidad: 'porcentaje',
        tipo: 'number',
        valor: 30,
        min: 5,
        max: 95
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
        nombre: 'Tiempo de residencia',
        unidad: 'años',
        tipo: 'number',
        valor: 2,
        min: 1,
        max: 5
      }
    ]
  },
  'ddjj_consentimiento': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'Declaración jurada de consentimiento de participación',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
    ]
  },
  'ddjj_no_deuda': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'Declaración jurada de no tener deuda de reparación civil',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
    ]
  },
  'ddjj_de_conciencia': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada de conciencia del candidato según normativa electoral',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
    ]
  },
  'ddjj_de_renuncia': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada de renuncia a cargos incompatibles con la postulación',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
    ]
  },
  'ddjj_de_licencia': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada de licencia sin goce de haber para funcionarios públicos',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
    ]
  },
  'ddjj_domicilio_multiple': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada para candidatos con múltiples domicilios que especifique el domicilio electoral',
    obligatoriedad: 'opcional',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
    ]
  },
  'ddjj_inscripcion_extranjero': {
    categoriaRequisito: '',
    descripcionRequisito: 'Declaración jurada de inscripción en el registro electoral para ciudadanos extranjeros naturalizados',
    obligatoriedad: 'opcional',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
    ]
  },
  'plan_gobierno': {
    categoriaRequisito: 'plan_gobierno',
    descripcionRequisito: 'Se valida que el Plan de Gobierno y el Resumen del Plan de Gobierno tengan concordancia',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'lista_completa',
    parametros: [
    ]
  },
  'verifica_rop': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'Se valida si el candidato se encuentra inscrito al ROP',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
    ]
  },
  'ddjj_plazo': {
    categoriaRequisito: 'hoja_vida_candidato',
    descripcionRequisito: 'La Hoja de Vida deberá presentarse firmada por el personero legal. Las Declaraciones Juradas de Consentimiento y de No Deuda por Reparación Civil deberán presentarse en la misma fecha o después de la Hoja de Vida, no antes.',
    obligatoriedad: 'obligatorio',
    nombreCriterio: 'cuerpo_lista',
    parametros: [
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

// Estructura jerárquica para configuraciones únicas por contexto
export interface ConfiguracionContexto {
  parametrosValues: Record<string, string | number>;
  configuracionGuardada?: boolean;
}

// Store jerárquico para configuraciones por contexto único
// Estructura: CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion][tipoExpediente][tipoMateria][requisitoEspecifico]
export const CONFIGURACIONES_CONTEXTO: Record<string, Record<string, Record<string, Record<string, Record<string, Record<string, ConfiguracionContexto>>>>>> = {};

// Función para generar clave única de contexto
export const generateContextKey = (contexto: {
  ano: string;
  tipoProcesoElectoral: string;
  tipoEleccion: string;
  tipoExpediente: string;
  tipoMateria: string;
  requisitoEspecifico: string;
}): string => {
  return `${contexto.ano}_${contexto.tipoProcesoElectoral}_${contexto.tipoEleccion}_${contexto.tipoExpediente}_${contexto.tipoMateria}_${contexto.requisitoEspecifico}`;
};

// Función para obtener configuración de contexto específico
export const getConfiguracionContexto = (contexto: {
  ano: string;
  tipoProcesoElectoral: string;
  tipoEleccion: string;
  tipoExpediente: string;
  tipoMateria: string;
  requisitoEspecifico: string;
}): ConfiguracionContexto => {
  const { ano, tipoProcesoElectoral, tipoEleccion, tipoExpediente, tipoMateria, requisitoEspecifico } = contexto;
  
  // Inicializar estructura jerárquica si no existe
  if (!CONFIGURACIONES_CONTEXTO[ano]) {
    CONFIGURACIONES_CONTEXTO[ano] = {};
  }
  if (!CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral]) {
    CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral] = {};
  }
  if (!CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion]) {
    CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion] = {};
  }
  if (!CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion][tipoExpediente]) {
    CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion][tipoExpediente] = {};
  }
  if (!CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion][tipoExpediente][tipoMateria]) {
    CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion][tipoExpediente][tipoMateria] = {};
  }
  if (!CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion][tipoExpediente][tipoMateria][requisitoEspecifico]) {
    // Inicializar con valores por defecto del PARAMETROS_MOCK
    const parametroBase = PARAMETROS_MOCK[requisitoEspecifico];
    const valoresIniciales: Record<string, string | number> = {};
    
    if (parametroBase && parametroBase.parametros) {
      parametroBase.parametros.forEach(param => {
        valoresIniciales[param.nombre] = param.valor;
      });
    }
    
    CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion][tipoExpediente][tipoMateria][requisitoEspecifico] = {
      parametrosValues: valoresIniciales,
      configuracionGuardada: false
    };
  }
  
  return CONFIGURACIONES_CONTEXTO[ano][tipoProcesoElectoral][tipoEleccion][tipoExpediente][tipoMateria][requisitoEspecifico];
};

// Función para actualizar configuración de contexto específico
export const updateConfiguracionContexto = (
  contexto: {
    ano: string;
    tipoProcesoElectoral: string;
    tipoEleccion: string;
    tipoExpediente: string;
    tipoMateria: string;
    requisitoEspecifico: string;
  },
  parametrosValues: Record<string, string | number>
): void => {
  const configuracion = getConfiguracionContexto(contexto);
  configuracion.parametrosValues = { ...configuracion.parametrosValues, ...parametrosValues };
  configuracion.configuracionGuardada = true;
};

// Función para generar objeto de salida según especificaciones
export const generarObjetoSalida = (contexto: {
  ano: string;
  tipoProcesoElectoral: string;
  tipoEleccion: string;
  tipoExpediente: string;
  tipoMateria: string;
  requisitoEspecifico: string;
}, parametrosValues: Record<string, string | number>) => {
  const parametroBase = PARAMETROS_MOCK[contexto.requisitoEspecifico];
  
  return {
    ANIO: ID_MAPPINGS.ANOS[contexto.ano as keyof typeof ID_MAPPINGS.ANOS],
    TIPO_PROCESO: ID_MAPPINGS.TIPOS_PROCESO[contexto.tipoProcesoElectoral as keyof typeof ID_MAPPINGS.TIPOS_PROCESO],
    TIPO_ELECCION: ID_MAPPINGS.TIPOS_ELECCION[contexto.tipoEleccion as keyof typeof ID_MAPPINGS.TIPOS_ELECCION],
    ID_TIPO_EXPEDIENTE: ID_MAPPINGS.TIPOS_EXPEDIENTE[contexto.tipoExpediente as keyof typeof ID_MAPPINGS.TIPOS_EXPEDIENTE],
    ID_MATERIA: ID_MAPPINGS.TIPOS_MATERIA[contexto.tipoMateria as keyof typeof ID_MAPPINGS.TIPOS_MATERIA],
    ID_REQUISITO: ID_MAPPINGS.REQUISITOS[contexto.requisitoEspecifico as keyof typeof ID_MAPPINGS.REQUISITOS],
    TIPO_REQUISITO: ID_MAPPINGS.CATEGORIAS_REQUISITO[parametroBase?.categoriaRequisito as keyof typeof ID_MAPPINGS.CATEGORIAS_REQUISITO],
    DESCRIPCION: parametroBase?.descripcionRequisito || '',
    CONF_PARAM: parametrosValues
  };
};

// Función para actualizar parámetros mock (mantenida para compatibilidad)
export const updateParametrosMock = (
  requisitoId: string, 
  parametrosActualizados: ParametroEvaluacion
): void => {
  if (PARAMETROS_MOCK[requisitoId]) {
    PARAMETROS_MOCK[requisitoId] = { ...parametrosActualizados };
  }
};

// Función para obtener parámetros mock (mantenida para compatibilidad)
export const getParametrosMock = (requisitoId: string): ParametroEvaluacion | null => {
  return PARAMETROS_MOCK[requisitoId] || null;
};