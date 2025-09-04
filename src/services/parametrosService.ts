import apiClient from '../config/axios';
import { handleApiError } from '../utils/apiErrorHandler';

export interface BackendParametroResponse {
  txanioeleccion: string;
  idtipoproceso: number;
  txtipoproceso: string;
  idtipoeleccion: number;
  txtipoeleccion: string;
  idtipoexpediente: number;
  txtipoexpediente: string;
  idmateria: number;
  txmateria: string;
  id_requisito: number;
  id_estado: number;
  conf_param: string | null;
  tipo_requisito: number;
  descripcion: string;
}

export interface BackendParametrosApiResponse {
  message: string;
  total_registros: number;
  parametros: BackendParametroResponse[];
  status: string;
}

export interface ParametroConfig {
  nombre: string;
  unidad: string;
  tipo: 'number' | 'select' | 'radio' | 'date';
  valor: string | number;
  obligatorio: boolean;
  step?: number;
}

export interface ConfiguracionContexto {
  categoriaRequisito: string;
  parametros: ParametroConfig[];
  descripcion: string;
  habilitado: boolean;
}

export interface EstructuraAno {
  TIPOS_PROCESO_ELECTORAL: Array<{ value: string; label: string }>;
  TIPOS_ELECCION: Array<{ value: string; label: string }>;
  TIPOS_EXPEDIENTE: Array<{ value: string; label: string }>;
  TIPOS_MATERIA: Array<{ value: string; label: string }>;
  REQUISITOS_ESPECIFICOS: Array<{ value: string; label: string }>;
  CONFIGURACIONES: Record<string, Record<string, Record<string, Record<string, Record<string, ConfiguracionContexto>>>>>;
}

export interface FrontendParametrosStructure {
  ANOS_DISPONIBLES: Array<{ value: string; label: string }>;
  ESTRUCTURA_POR_ANO: Record<string, EstructuraAno>;
}

class ParametrosService {
  /**
   * Get all parameters from backend and transform to frontend structure
   */
  async getParametros(): Promise<FrontendParametrosStructure> {
    try {
      const response = await apiClient.get<BackendParametrosApiResponse>('/plataforma/consulta_parametros');
      
      console.log('Backend parametros response:', response.data);
      
      return this.transformParametrosToFrontendStructure(response.data.parametros);
    } catch (error) {
      console.error('Error fetching parametros:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Transform backend parametros array to frontend structure organized by year
   */
  private transformParametrosToFrontendStructure(parametros: BackendParametroResponse[]): FrontendParametrosStructure {
    const anosSet = new Set<string>();
    const estructuraPorAno: Record<string, EstructuraAno> = {};

    // Group parametros by year first
    const parametrosPorAno = parametros.reduce((acc, param) => {
      const ano = param.txanioeleccion;
      anosSet.add(ano);
      if (!acc[ano]) acc[ano] = [];
      acc[ano].push(param);
      return acc;
    }, {} as Record<string, BackendParametroResponse[]>);

    // Build structure for each year
    for (const [ano, parametrosAno] of Object.entries(parametrosPorAno)) {
      const tiposProceso = new Map<number, string>();
      const tiposEleccion = new Map<number, string>();
      const tiposExpediente = new Map<number, string>();
      const tiposMateria = new Map<number, string>();
      const requisitosEspecificos = new Map<number, string>();
      const configuraciones: Record<string, Record<string, Record<string, Record<string, Record<string, ConfiguracionContexto>>>>> = {};

      parametrosAno.forEach(param => {
        // Collect unique values for this year
        tiposProceso.set(param.idtipoproceso, param.txtipoproceso.toLowerCase());
        tiposEleccion.set(param.idtipoeleccion, param.txtipoeleccion.toLowerCase());
        tiposExpediente.set(param.idtipoexpediente, param.txtipoexpediente.toLowerCase());
        tiposMateria.set(param.idmateria, param.txmateria.toLowerCase());
        requisitosEspecificos.set(param.id_requisito, this.getRequisitoName(param.id_requisito));

        // Build nested configuration structure
        const tipoProceso = param.idtipoproceso.toString();
        const tipoEleccion = param.idtipoeleccion.toString();
        const tipoExpediente = param.idtipoexpediente.toString();
        const tipoMateria = param.idmateria.toString();
        const requisitoId = param.id_requisito.toString();

        if (!configuraciones[tipoProceso]) configuraciones[tipoProceso] = {};
        if (!configuraciones[tipoProceso][tipoEleccion]) configuraciones[tipoProceso][tipoEleccion] = {};
        if (!configuraciones[tipoProceso][tipoEleccion][tipoExpediente]) configuraciones[tipoProceso][tipoEleccion][tipoExpediente] = {};
        if (!configuraciones[tipoProceso][tipoEleccion][tipoExpediente][tipoMateria]) configuraciones[tipoProceso][tipoEleccion][tipoExpediente][tipoMateria] = {};

        // Parse conf_param JSON if exists
        let parametrosConfigurados: ParametroConfig[] = [];
        if (param.conf_param) {
          try {
            const configObj = JSON.parse(param.conf_param);
            parametrosConfigurados = this.mapConfigObjectToParametros(configObj);
          } catch {
            console.warn(`Failed to parse conf_param for requisito ${param.id_requisito}:`, param.conf_param);
          }
        }

        configuraciones[tipoProceso][tipoEleccion][tipoExpediente][tipoMateria][requisitoId] = {
          categoriaRequisito: this.mapTipoRequisitoToCategory(param.tipo_requisito),
          parametros: parametrosConfigurados,
          descripcion: param.descripcion,
          habilitado: param.id_estado === 1
        };
      });

      estructuraPorAno[ano] = {
        TIPOS_PROCESO_ELECTORAL: Array.from(tiposProceso.entries()).map(([id, label]) => ({ value: id.toString(), label })),
        TIPOS_ELECCION: Array.from(tiposEleccion.entries()).map(([id, label]) => ({ value: id.toString(), label })),
        TIPOS_EXPEDIENTE: Array.from(tiposExpediente.entries()).map(([id, label]) => ({ value: id.toString(), label })),
        TIPOS_MATERIA: Array.from(tiposMateria.entries()).map(([id, label]) => ({ value: id.toString(), label })),
        REQUISITOS_ESPECIFICOS: Array.from(requisitosEspecificos.entries()).map(([id, label]) => ({ value: id.toString(), label })),
        CONFIGURACIONES: configuraciones
      };
    }

    return {
      ANOS_DISPONIBLES: Array.from(anosSet).sort().map(ano => ({ value: ano, label: ano })),
      ESTRUCTURA_POR_ANO: estructuraPorAno
    };
  }

  /**
   * Map tipo_requisito number to category string
   */
  private mapTipoRequisitoToCategory(tipoRequisito: number): string {
    switch (tipoRequisito) {
      case 1: return 'solicitud_inscripcion';
      case 2: return 'acta_eleccion_interna';
      case 3: return 'hoja_vida_candidato';
      case 4: return 'plan_gobierno';
      default: return 'otros';
    }
  }

  /**
   * Get descriptive name for requisito based on ID and description
   */
  private getRequisitoName(idRequisito: number): string {
    // Map common requisito IDs to readable names
    const requisitoNames: Record<number, string> = {
      1: 'Cuota de Género',
      2: 'Cuota Joven', 
      4: 'Alternancia de Género',
      5: 'Solicitud Firmada',
      6: 'Acta Plazo',
      7: 'Ubigeo Electoral',
      8: 'Lista Candidatos Acta',
      9: 'Comprobante de Pago',
      10: 'Ubigeo Candidato',
      11: 'DDJJ Consentimiento',
      12: 'DDJJ No Deuda',
      18: 'Plan Gobierno',
      19: 'Verificación ROP',
      20: 'Cantidad Regidores',
      21: 'DDJJ Plazo',
      22: 'Ubigeo Plan Gobierno',
      23: 'Comité Electoral'
    };

    return requisitoNames[idRequisito] || `Requisito ${idRequisito}`;
  }

  /**
   * Map configuration object to frontend parametros structure
   */
  private mapConfigObjectToParametros(configObj: Record<string, unknown>): ParametroConfig[] {
    const parametros: ParametroConfig[] = [];

    for (const [key, value] of Object.entries(configObj)) {
      let tipo: 'number' | 'select' | 'radio' | 'date' = 'number';
      let step: number | undefined;

      // Determine parameter type based on value and key
      if (typeof value === 'number') {
        if (key.toLowerCase().includes('tasa') || key.toLowerCase().includes('monto')) {
          tipo = 'number';
          step = 0.01;
        } else {
          tipo = 'number';
        }
      } else if (key.toLowerCase().includes('fecha')) {
        tipo = 'date';
      }

      parametros.push({
        nombre: key,
        unidad: '', // Default empty unit, could be enhanced based on parameter type
        tipo,
        valor: value as string | number,
        obligatorio: true,
        step
      });
    }

    return parametros;
  }
}

export const parametrosService = new ParametrosService();
export default parametrosService;