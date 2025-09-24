import React, { useState, useEffect } from 'react';
import { type NormativasData, type SelectedNormativas, type LeyData, type ReglamentoData } from '../../types/normativa';

interface NormativasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowConsent: (selectedNormativas: SelectedNormativas) => void;
  normativasData?: NormativasData;
}

export const NormativasModal: React.FC<NormativasModalProps> = ({
  isOpen,
  onClose,
  onShowConsent,
  normativasData
}) => {
  const [activeTab, setActiveTab] = useState<'leyes' | 'reglamentos'>('leyes');
  const [selectedNormativas, setSelectedNormativas] = useState<SelectedNormativas>({
    leyes: [],
    reglamentos: []
  });
  const [selectedArticulos, setSelectedArticulos] = useState<Record<string, Set<string>>>({});

  // Mock data - En producción esto vendría del backend
  const mockNormativas: NormativasData = normativasData || {
    leyes: [
      {
        nombre: "Ley Orgánica de Elecciones - Ley N° 26859",
        articulos: [
          { id: "art1", seccion: "Artículo 1°.- Finalidad de la ley" },
          { id: "art2", seccion: "Artículo 2°.- Principios electorales" },
          { id: "art3", seccion: "Artículo 3°.- Derecho de sufragio" }
        ]
      },
      {
        nombre: "Ley de Partidos Políticos - Ley N° 28094",
        articulos: [
          { id: "art10", seccion: "Artículo 10°.- Inscripción de partidos políticos" },
          { id: "art11", seccion: "Artículo 11°.- Requisitos para la inscripción" },
          { id: "art12", seccion: "Artículo 12°.- Documentación requerida" }
        ]
      }
    ],
    reglamentos: [
      {
        nombre: "Reglamento de Inscripción de Listas de Candidatos",
        numero: "R.N° 0123-2024-JNE",
        articulos: [
          { id: "reg1", seccion: "Artículo 1°.- Ámbito de aplicación" },
          { id: "reg2", seccion: "Artículo 2°.- Procedimiento de inscripción" },
          { id: "reg3", seccion: "Artículo 3°.- Validación de requisitos" }
        ]
      },
      {
        nombre: "Reglamento de Fiscalización Electoral",
        numero: "R.N° 0456-2024-JNE",
        articulos: [
          { id: "reg10", seccion: "Artículo 10°.- Proceso de fiscalización" },
          { id: "reg11", seccion: "Artículo 11°.- Sanciones aplicables" }
        ]
      }
    ]
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setSelectedNormativas({ leyes: [], reglamentos: [] });
      setSelectedArticulos({});
    }
  }, [isOpen]);

  const handleNormativaChange = (tipo: 'leyes' | 'reglamentos', normativaNombre: string, checked: boolean) => {
    setSelectedNormativas(prev => {
      const updated = { ...prev };
      
      if (checked) {
        // Add normativa
        if (!updated[tipo].find(n => n.nombre === normativaNombre)) {
          updated[tipo].push({ nombre: normativaNombre, articulos: [] });
        }
      } else {
        // Remove normativa
        updated[tipo] = updated[tipo].filter(n => n.nombre !== normativaNombre);
      }
      
      return updated;
    });

    // Auto-select/deselect all articles for this normativa
    const normativa = mockNormativas[tipo].find(n => n.nombre === normativaNombre);
    if (normativa) {
      setSelectedArticulos(prev => {
        const updated = { ...prev };
        if (checked) {
          updated[normativaNombre] = new Set(normativa.articulos.map(a => a.id));
        } else {
          delete updated[normativaNombre];
        }
        return updated;
      });
    }
  };

  const handleArticuloChange = (normativaNombre: string, articuloId: string, checked: boolean) => {
    setSelectedArticulos(prev => {
      const updated = { ...prev };
      if (!updated[normativaNombre]) {
        updated[normativaNombre] = new Set();
      }
      
      if (checked) {
        updated[normativaNombre].add(articuloId);
      } else {
        updated[normativaNombre].delete(articuloId);
      }
      
      return updated;
    });

    // Update selected normativas with articles
    setSelectedNormativas(prev => {
      const updated = { ...prev };
      const tipo = mockNormativas.leyes.find(l => l.nombre === normativaNombre) ? 'leyes' : 'reglamentos';
      const normativaIndex = updated[tipo].findIndex(n => n.nombre === normativaNombre);
      
      if (normativaIndex >= 0) {
        const articulos = Array.from(selectedArticulos[normativaNombre] || new Set());
        if (checked) articulos.push(articuloId);
        updated[tipo][normativaIndex] = {
          ...updated[tipo][normativaIndex],
          articulos: [...new Set(articulos)]
        };
      }
      
      return updated;
    });
  };

  const handleConfirm = () => {
    // Filter out normativas with no selected articles
    const filteredNormativas: SelectedNormativas = {
      leyes: selectedNormativas.leyes.map(ley => ({
        ...ley,
        articulos: Array.from(selectedArticulos[ley.nombre] || new Set())
      })).filter(ley => ley.articulos.length > 0),
      reglamentos: selectedNormativas.reglamentos.map(reg => ({
        ...reg,
        articulos: Array.from(selectedArticulos[reg.nombre] || new Set())
      })).filter(reg => reg.articulos.length > 0)
    };

    onShowConsent(filteredNormativas);
  };

  const isNormativaSelected = (normativaNombre: string) => {
    return selectedNormativas.leyes.some(l => l.nombre === normativaNombre) ||
           selectedNormativas.reglamentos.some(r => r.nombre === normativaNombre);
  };

  const hasSelectedNormativas = () => {
    return selectedNormativas.leyes.length > 0 || selectedNormativas.reglamentos.length > 0;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Normativas Aplicables</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <ul className="flex" role="tablist">
              <li className="mr-2">
                <button
                  className={`inline-block p-4 border-b-2 transition-colors hover:cursor-pointer ${
                    activeTab === 'leyes'
                      ? 'text-jne-red border-jne-red'
                      : 'text-gray-500 hover:text-gray-700 border-transparent'
                  }`}
                  onClick={() => setActiveTab('leyes')}
                  type="button"
                  role="tab"
                >
                  Leyes
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 border-b-2 transition-colors hover:cursor-pointer ${
                    activeTab === 'reglamentos'
                      ? 'text-jne-red border-jne-red'
                      : 'text-gray-500 hover:text-gray-700 border-transparent'
                  }`}
                  onClick={() => setActiveTab('reglamentos')}
                  type="button"
                  role="tab"
                >
                  Reglamentos
                </button>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {activeTab === 'leyes' && (
              <div className="space-y-4">
                {mockNormativas.leyes.map((ley: LeyData) => (
                  <div key={ley.nombre} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-jne-red focus:ring-jne-red border-gray-300 rounded"
                          checked={isNormativaSelected(ley.nombre)}
                          onChange={(e) => handleNormativaChange('leyes', ley.nombre, e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-gray-800">{ley.nombre}</h4>
                        <div className="mt-2 space-y-2">
                          {ley.articulos.map((articulo) => (
                            <div key={articulo.id} className="flex items-start">
                              <div className="flex-shrink-0 mt-1">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-jne-red focus:ring-jne-red border-gray-300 rounded"
                                  checked={selectedArticulos[ley.nombre]?.has(articulo.id) || false}
                                  onChange={(e) => handleArticuloChange(ley.nombre, articulo.id, e.target.checked)}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-xs text-gray-600">{articulo.seccion}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reglamentos' && (
              <div className="space-y-4">
                {mockNormativas.reglamentos.map((reglamento: ReglamentoData) => (
                  <div key={reglamento.nombre} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-jne-red focus:ring-jne-red border-gray-300 rounded"
                          checked={isNormativaSelected(reglamento.nombre)}
                          onChange={(e) => handleNormativaChange('reglamentos', reglamento.nombre, e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-gray-800">{reglamento.nombre}</h4>
                        {reglamento.numero && (
                          <p className="text-xs text-gray-500">Número: {reglamento.numero}</p>
                        )}
                        <div className="mt-2 space-y-2">
                          {reglamento.articulos.map((articulo) => (
                            <div key={articulo.id} className="flex items-start">
                              <div className="flex-shrink-0 mt-1">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-jne-red focus:ring-jne-red border-gray-300 rounded"
                                  checked={selectedArticulos[reglamento.nombre]?.has(articulo.id) || false}
                                  onChange={(e) => handleArticuloChange(reglamento.nombre, articulo.id, e.target.checked)}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-xs text-gray-600">{articulo.seccion}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!hasSelectedNormativas()}
              className={`px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:cursor-pointer ${
                hasSelectedNormativas()
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Confirmar y Generar Resolución
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};