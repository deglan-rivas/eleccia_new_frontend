import React, { useState } from 'react';
import { type TabData, type RequisitoData } from '../../types/expediente';
import { RequisitoCard } from './RequisitoCard';
import { CandidatoCard } from './CandidatoCard';

interface RequisitosTabsProps {
  tabs: TabData[];
  onEditRequisito?: (requisito: RequisitoData) => void;
  editMode?: boolean;
}

export const RequisitosTabs: React.FC<RequisitosTabsProps> = ({ tabs, onEditRequisito, editMode = false }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md max-w-5xl mx-auto mb-6">
      <div className="border-b border-gray-200">
        <ul className="flex overflow-x-auto" role="tablist">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button 
                className={`inline-block p-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-jne-red border-jne-red'
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
                onClick={() => handleTabClick(tab.id)}
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected={activeTab === tab.id}
              >
                {tab.nombre}
                {tab.id === 'hoja_vida_candidatos' && tab.candidatos && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {tab.candidatos.length}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div id="requisitosTabContent">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`p-4 rounded-lg ${activeTab === tab.id ? '' : 'hidden'}`}
            id={tab.id}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
          >
            {tab.id === 'hoja_vida_candidatos' ? (
              <>
                <h4 className="font-semibold text-gray-800 mb-4">{tab.nombre}</h4>
                <div className="space-y-4">
                  {tab.candidatos?.map((candidato, index) => (
                    <CandidatoCard
                      key={index}
                      candidato={candidato}
                      onEditRequisito={onEditRequisito}
                      editMode={editMode}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <h4 className="font-semibold text-gray-800 mb-4">{tab.nombre}</h4>
                <div className="space-y-4">
                  {tab.requisitos?.map((requisito, reqIndex) => (
                    <RequisitoCard
                      key={reqIndex}
                      requisito={requisito}
                      onEdit={onEditRequisito}
                      editMode={editMode}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};