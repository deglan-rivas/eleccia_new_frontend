/**
 * Utility functions for formatting resolution types
 */

/**
 * Converts resolution type codes to readable resolution names
 */
export const formatTipoResolucion = (tipoResolucion: string): string => {
  const formatMap: Record<string, string> = {
    'INADMISIBLE': 'Resolución de Inadmisibilidad',
    'ADMISIBLE': 'Resolución de Admisibilidad',
    'IMPROCEDENTE': 'Resolución de Improcedencia'
  };
  
  return formatMap[tipoResolucion.toUpperCase()] || tipoResolucion;
};