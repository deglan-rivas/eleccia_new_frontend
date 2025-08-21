// Utility functions for formatting data

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

export const getEstadoBadgeClass = (estado: string): string => {
  switch (estado.toUpperCase()) {
    case 'COMPLETADO':
    case 'APROBADO':
      return 'bg-green-100 text-green-800';
    case 'EN_PROCESO':
    case 'EN_REVISION':
      return 'bg-yellow-100 text-yellow-800';
    case 'RECHAZADO':
      return 'bg-red-100 text-red-800';
    case 'PENDIENTE':
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getRecomendacionClass = (recomendacion: string): string => {
  const upperRecomendacion = recomendacion.toUpperCase();
  if (upperRecomendacion.includes('APROBAR')) {
    return 'text-green-600 bg-green-50 border-green-200';
  }
  if (upperRecomendacion.includes('RECHAZAR')) {
    return 'text-red-600 bg-red-50 border-red-200';
  }
  return 'text-yellow-600 bg-yellow-50 border-yellow-200';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};