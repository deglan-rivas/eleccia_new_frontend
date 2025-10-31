import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { type ExpedienteDetailData } from '../../types/expediente';

interface InformeModalProps {
  isOpen: boolean;
  onClose: () => void;
  expedienteData: ExpedienteDetailData;
}


export const InformeModal: React.FC<InformeModalProps> = ({ isOpen, onClose, expedienteData }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!modalContentRef.current) return;

    try {
      setIsGeneratingPDF(true);

      // Obtener el contenido del modal
      const content = modalContentRef.current;

      // Crear un contenedor temporal para el PDF
      const tempContainer = document.createElement('div');
      tempContainer.style.width = '210mm'; // Ancho A4
      tempContainer.style.padding = '20mm';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '-9999px';
      tempContainer.style.left = '-9999px';
      
      // Clonar el contenido
      const contentClone = content.cloneNode(true) as HTMLElement;
      
      // Ajustar estilos del contenido clonado
      const allElements = contentClone.querySelectorAll('*') as NodeListOf<HTMLElement>;
      allElements.forEach(el => {
        if (el.style) {
          el.style.maxHeight = 'none';
          el.style.height = 'auto';
          el.style.overflow = 'visible';
          el.style.pageBreakInside = 'avoid';
        }

        // Forzar estilos seguros para html2canvas - reemplazar clases problemáticas
        const classList = Array.from(el.classList);
        
        // Aplicar estilos directos basados en las clases de Tailwind
        classList.forEach(className => {
          switch (className) {
            // Layout - Grid
            case 'grid':
              el.style.display = 'grid';
              break;
            case 'grid-cols-1':
              el.style.gridTemplateColumns = 'repeat(1, minmax(0, 1fr))';
              break;
            case 'grid-cols-2':
              el.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
              break;
            case 'grid-cols-4':
              el.style.gridTemplateColumns = 'repeat(4, minmax(0, 1fr))';
              break;
              
            // Layout - Flexbox
            case 'flex':
              el.style.display = 'flex';
              break;
            case 'items-center':
              el.style.alignItems = 'center';
              break;
            case 'items-start':
              el.style.alignItems = 'flex-start';
              break;
            case 'justify-between':
              el.style.justifyContent = 'space-between';
              break;
            case 'justify-center':
              el.style.justifyContent = 'center';
              break;
            case 'flex-1':
              el.style.flex = '1 1 0%';
              break;
            case 'flex-shrink-0':
              el.style.flexShrink = '0';
              break;
              
            // Spacing
            case 'gap-4':
              el.style.gap = '1rem';
              break;
            case 'gap-2':
              el.style.gap = '0.5rem';
              break;
            case 'mb-2':
              el.style.marginBottom = '0.5rem';
              break;
            case 'mb-3':
              el.style.marginBottom = '0.75rem';
              break;
            case 'mb-4':
              el.style.marginBottom = '1rem';
              break;
            case 'mb-6':
              el.style.marginBottom = '1.5rem';
              break;
            case 'mt-1':
              el.style.marginTop = '0.25rem';
              break;
            case 'mt-2':
              el.style.marginTop = '0.5rem';
              break;
            case 'ml-3':
              el.style.marginLeft = '0.75rem';
              break;
            case 'mr-1':
              el.style.marginRight = '0.25rem';
              break;
            case 'p-3':
              el.style.padding = '0.75rem';
              break;
            case 'p-4':
              el.style.padding = '1rem';
              break;
              
            // Backgrounds
            case 'bg-gray-50':
              el.style.backgroundColor = 'rgb(250, 250, 250)';
              break;
            case 'bg-gray-100':
              el.style.backgroundColor = 'rgb(243, 244, 246)';
              break;
            case 'bg-blue-50':
              el.style.backgroundColor = 'rgb(239, 246, 255)';
              break;
            case 'bg-green-50':
              el.style.backgroundColor = 'rgb(240, 253, 244)';
              break;
            case 'bg-red-50':
              el.style.backgroundColor = 'rgb(254, 242, 242)';
              break;
            case 'bg-yellow-50':
              el.style.backgroundColor = 'rgb(254, 252, 232)';
              break;
            case 'bg-white':
              el.style.backgroundColor = 'rgb(255, 255, 255)';
              break;
            
            // Text colors
            case 'text-gray-500':
              el.style.color = 'rgb(107, 114, 128)';
              break;
            case 'text-gray-600':
              el.style.color = 'rgb(75, 85, 99)';
              break;
            case 'text-gray-700':
              el.style.color = 'rgb(55, 65, 81)';
              break;
            case 'text-gray-800':
              el.style.color = 'rgb(31, 41, 55)';
              break;
            case 'text-blue-700':
              el.style.color = 'rgb(29, 78, 216)';
              break;
            case 'text-green-600':
            case 'text-green-700':
              el.style.color = 'rgb(21, 128, 61)';
              break;
            case 'text-red-600':
            case 'text-red-700':
              el.style.color = 'rgb(185, 28, 28)';
              break;
            case 'text-yellow-700':
              el.style.color = 'rgb(161, 98, 7)';
              break;
            case 'text-jne-red':
              el.style.color = 'rgb(220, 38, 127)';
              break;
              
            // Typography
            case 'text-sm':
              el.style.fontSize = '0.875rem';
              el.style.lineHeight = '1.25rem';
              break;
            case 'text-xs':
              el.style.fontSize = '0.75rem';
              el.style.lineHeight = '1rem';
              break;
            case 'text-lg':
              el.style.fontSize = '1.125rem';
              el.style.lineHeight = '1.75rem';
              break;
            case 'text-2xl':
              el.style.fontSize = '1.5rem';
              el.style.lineHeight = '2rem';
              break;
            case 'font-bold':
              el.style.fontWeight = '700';
              break;
            case 'font-medium':
              el.style.fontWeight = '500';
              break;
            case 'font-semibold':
              el.style.fontWeight = '600';
              break;
            case 'text-center':
              el.style.textAlign = 'center';
              break;
              
            // Border & Radius
            case 'rounded-lg':
              el.style.borderRadius = '0.5rem';
              break;
            case 'border':
              el.style.borderWidth = '1px';
              el.style.borderColor = 'rgb(229, 231, 235)';
              break;
          }
        });
      });

      // Ajustar contenedores específicos
      const containers = contentClone.querySelectorAll('.max-w-5xl, .max-w-4xl, .max-w-7xl') as NodeListOf<HTMLElement>;
      containers.forEach(container => {
        container.style.maxWidth = '100%';
        container.style.width = '100%';
      });

      // Ocultar botones de acción en la copia (múltiples selectores para asegurar que funcione)
      const actionButtonsContainer = contentClone.querySelector('.flex.items-center.space-x-4') as HTMLElement;
      if (actionButtonsContainer) {
        actionButtonsContainer.style.display = 'none';
      }

      // Selector alternativo por si el anterior no funciona
      const headerContainer = contentClone.querySelector('.flex.justify-between.items-center') as HTMLElement;
      if (headerContainer) {
        const buttonContainer = headerContainer.querySelector('.flex.items-center.space-x-4') as HTMLElement;
        if (buttonContainer) {
          buttonContainer.style.display = 'none';
        }
      }

      // Ocultar botones específicos por tipo
      const downloadButtons = contentClone.querySelectorAll('button') as NodeListOf<HTMLElement>;
      downloadButtons.forEach(button => {
        // Ocultar cualquier botón que contenga "Descargar" o tenga funciones de modal
        const buttonText = button.textContent?.trim() || '';
        if (buttonText.includes('Descargar') || buttonText.includes('Generando PDF') || 
            button.getAttribute('onClick') || button.onclick) {
          button.style.display = 'none';
        }
        
        // Ocultar botones que solo tengan SVG (como el botón de cerrar)
        const hasOnlyIcon = button.children.length === 1 && button.children[0].tagName === 'svg';
        if (hasOnlyIcon && buttonText === '') {
          button.style.display = 'none';
        }
      });

      // Agregar el contenido clonado al contenedor temporal
      tempContainer.appendChild(contentClone);
      document.body.appendChild(tempContainer);

      // Esperar un momento para que se renderice el contenido
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capturar el contenido como imagen
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: tempContainer.scrollWidth,
        windowHeight: tempContainer.scrollHeight,
        ignoreElements: (element) => {
          // Ignorar elementos que puedan causar problemas
          return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
        },
        onclone: (clonedDoc) => {
          // Aplicar estilos adicionales al documento clonado
          const style = clonedDoc.createElement('style');
          style.textContent = `
            /* Colores de texto */
            .text-gray-500 { color: rgb(107, 114, 128) !important; }
            .text-gray-600 { color: rgb(75, 85, 99) !important; }
            .text-gray-700 { color: rgb(55, 65, 81) !important; }
            .text-gray-800 { color: rgb(31, 41, 55) !important; }
            .text-blue-700 { color: rgb(29, 78, 216) !important; }
            .text-green-600, .text-green-700 { color: rgb(21, 128, 61) !important; }
            .text-red-600, .text-red-700 { color: rgb(185, 28, 28) !important; }
            .text-yellow-700 { color: rgb(161, 98, 7) !important; }
            .text-jne-red { color: rgb(220, 38, 127) !important; }
            
            /* Colores de fondo */
            .bg-gray-50 { background-color: rgb(250, 250, 250) !important; }
            .bg-blue-50 { background-color: rgb(239, 246, 255) !important; }
            .bg-green-50 { background-color: rgb(240, 253, 244) !important; }
            .bg-red-50 { background-color: rgb(254, 242, 242) !important; }
            .bg-yellow-50 { background-color: rgb(254, 252, 232) !important; }
            .bg-white { background-color: rgb(255, 255, 255) !important; }
            
            /* Grid System */
            .grid { display: grid !important; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
            .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
            
            /* Flexbox */
            .flex { display: flex !important; }
            .flex-col { flex-direction: column !important; }
            .items-center { align-items: center !important; }
            .items-start { align-items: flex-start !important; }
            .justify-between { justify-content: space-between !important; }
            .justify-center { justify-content: center !important; }
            .justify-end { justify-content: flex-end !important; }
            .flex-1 { flex: 1 1 0% !important; }
            .flex-shrink-0 { flex-shrink: 0 !important; }
            
            /* Spacing - Margin */
            .mb-1 { margin-bottom: 0.25rem !important; }
            .mb-2 { margin-bottom: 0.5rem !important; }
            .mb-3 { margin-bottom: 0.75rem !important; }
            .mb-4 { margin-bottom: 1rem !important; }
            .mb-6 { margin-bottom: 1.5rem !important; }
            .mt-1 { margin-top: 0.25rem !important; }
            .mt-2 { margin-top: 0.5rem !important; }
            .mt-3 { margin-top: 0.75rem !important; }
            .ml-3 { margin-left: 0.75rem !important; }
            .mr-1 { margin-right: 0.25rem !important; }
            .mr-3 { margin-right: 0.75rem !important; }
            
            /* Spacing - Padding */
            .p-3 { padding: 0.75rem !important; }
            .p-4 { padding: 1rem !important; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem !important; }
            
            /* Gap */
            .gap-4 { gap: 1rem !important; }
            .gap-2 { gap: 0.5rem !important; }
            .space-y-2 > * + * { margin-top: 0.5rem !important; }
            .space-x-4 > * + * { margin-left: 1rem !important; }
            
            /* Typography */
            .text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
            .text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
            .text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
            .text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
            .font-bold { font-weight: 700 !important; }
            .font-medium { font-weight: 500 !important; }
            .font-semibold { font-weight: 600 !important; }
            .text-center { text-align: center !important; }
            .text-justify { text-align: justify !important; }
            
            /* Border & Radius */
            .rounded-lg { border-radius: 0.5rem !important; }
            .rounded-md { border-radius: 0.375rem !important; }
            .border { border-width: 1px !important; border-color: rgb(229, 231, 235) !important; }
            
            /* Sizing */
            .h-5 { height: 1.25rem !important; }
            .w-5 { width: 1.25rem !important; }
            .h-4 { height: 1rem !important; }
            .w-4 { width: 1rem !important; }
            .w-8 { width: 2rem !important; }
            .h-8 { height: 2rem !important; }
            .w-12 { width: 3rem !important; }
            .h-12 { height: 3rem !important; }
            
            /* Media Queries para responsive */
            @media (min-width: 768px) {
              .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
              .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
              .md\\:col-span-2 { grid-column: span 2 / span 2 !important; }
            }
            
            /* Ocultar botones específicos en el PDF */
            button { display: none !important; }
            .flex.items-center.space-x-4 { display: none !important; }
            [role="button"] { display: none !important; }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Crear el PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      
      // Calcular dimensiones para ajustar al A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calcular el ratio para ajustar la imagen
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      
      // Centrar la imagen en la página
      const x = (pdfWidth - scaledWidth) / 2;
      const y = (pdfHeight - scaledHeight) / 2;

      // Agregar la imagen al PDF
      pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);
      
      // Descargar el PDF
      pdf.save(`informe_${expedienteData.nombre_expediente || 'expediente'}.pdf`);
      
      // Limpiar
      document.body.removeChild(tempContainer);
      
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      // Aquí podrías mostrar un toast de error si tienes un sistema de notificaciones
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="fixed inset-0 modal-backdrop overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3" ref={modalContentRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Informe Completo del Expediente {expedienteData.nombre_expediente}
            </h3>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleDownload}
                disabled={isGeneratingPDF}
                className={`flex items-center text-sm font-medium ${
                  isGeneratingPDF
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-jne-red hover:text-red-800 hover:cursor-pointer'
                }`}
              >
                {isGeneratingPDF ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar informe
                  </>
                )}
              </button>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Resumen de Requisitos */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Resumen de Requisitos</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-blue-700">{expedienteData.total_requisitos}</span>
                <p className="text-sm text-blue-700 mt-1">Total Requisitos</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-green-700">{expedienteData.requisitos_cumplidos}</span>
                <p className="text-sm text-green-700 mt-1">Requisitos Cumplidos</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-red-700">{expedienteData.requisitos_faltantes}</span>
                <p className="text-sm text-red-700 mt-1">Requisitos Faltantes</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-yellow-700">{expedienteData.porcentaje_cumplimiento}%</span>
                <p className="text-sm text-yellow-700 mt-1">Nivel de Cumplimiento</p>
              </div>
            </div>
          </div>

          {/* Requisitos por Sección */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Requisitos por Sección</h4>
            {expedienteData.tabs.map((tab) => (
              <div key={tab.id} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm font-medium text-gray-600">{tab.nombre}</h5>
                  {tab.id === '3' ? (
                    <div className="flex items-center">
                      {/* Candidate requirements count logic would go here */}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {tab.requisitos && (
                        <span className={`text-sm font-medium ${
                          tab.requisitos.filter(r => r.estado === 'CUMPLE').length === tab.requisitos.length && tab.requisitos.length > 0
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {tab.requisitos.filter(r => r.estado === 'CUMPLE').length}/{tab.requisitos.length}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {tab.id === '3' ? (
                    <>
                      {tab.candidatos?.map((candidato, candidatoIndex) => (
                        <div key={candidatoIndex} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{candidato.nombres} {candidato.apellidos}</span>
                            <span className={`text-sm font-medium ${
                              candidato.requisitos.filter(r => r.estado === 'CUMPLE').length === candidato.requisitos.length && candidato.requisitos.length > 0
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {candidato.requisitos.filter(r => r.estado === 'CUMPLE').length}/{candidato.requisitos.length}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {candidato.requisitos.map((requisito, reqIndex) => (
                              <div key={reqIndex} className="flex justify-between items-center py-1">
                                <span>{requisito.nombre}</span>
                                <span className={`text-xs ${requisito.estado === 'CUMPLE' ? 'text-green-600' : 'text-red-600'}`}>
                                  {requisito.estado_texto}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {tab.requisitos?.map((requisito, reqIndex) => (
                        <div key={reqIndex} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm">{requisito.nombre}</span>
                          <span className={`text-xs ${requisito.estado === 'CUMPLE' ? 'text-green-600' : 'text-red-600'}`}>
                            {requisito.estado_texto}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Descripción de la Resolución */}
          {/* <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Descripción de la Resolución</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-600">Tipo de Resolución</h5>
                <p className="text-sm text-gray-800">{expedienteData.tipo_resolucion}</p>
              </div>
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-600">Motivo</h5>
                <p className="text-sm text-gray-800">{expedienteData.motivo_resolucion}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-600">Análisis</h5>
                <div 
                  className="text-sm text-gray-800 text-justify"
                  dangerouslySetInnerHTML={{ __html: expedienteData.analisis_resolucion }}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};