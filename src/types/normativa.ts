export interface ArticuloData {
  id: string;
  seccion: string;
}

export interface LeyData {
  nombre: string;
  articulos: ArticuloData[];
}

export interface ReglamentoData {
  nombre: string;
  numero?: string;
  articulos: ArticuloData[];
}

export interface NormativasData {
  leyes: LeyData[];
  reglamentos: ReglamentoData[];
}

export interface SelectedNormativa {
  nombre: string;
  articulos: string[];
}

export interface SelectedNormativas {
  leyes: SelectedNormativa[];
  reglamentos: SelectedNormativa[];
}