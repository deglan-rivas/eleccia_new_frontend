import React from 'react';
import { Button } from './Button';
import { Select } from './Select';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  perPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  perPage,
  hasPrev,
  hasNext,
  onPageChange,
  onPerPageChange,
}) => {
  const perPageOptions = [
    { value: '5', label: '5 por página' },
    { value: '10', label: '10 por página' },
    { value: '20', label: '20 por página' },
    { value: '50', label: '50 por página' },
  ];

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPerPageChange(parseInt(e.target.value));
  };

  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endRecord = Math.min(currentPage * perPage, totalRecords);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (startPage > 1) {
        pages.unshift('...');
        pages.unshift(1);
      }
      
      if (endPage < totalPages) {
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalRecords === 0) {
    return null;
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between items-center">
        {/* Records info */}
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{startRecord}</span> - <span className="font-medium">{endRecord}</span> de{' '}
            <span className="font-medium">{totalRecords}</span> registros
          </p>
          
          {/* Per page selector */}
          <div className="flex items-center space-x-2">
            <Select
              name="perPage"
              value={perPage.toString()}
              onChange={handlePerPageChange}
              options={perPageOptions}
              className="text-sm"
            />
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center space-x-1">
          {/* First page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={!hasPrev}
            className="px-2 py-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </Button>

          {/* Previous page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrev}
            className="px-3 py-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </Button>

          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {generatePageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span key={index} className="px-3 py-2 text-gray-500">
                    ...
                  </span>
                );
              }
              
              const pageNumber = page as number;
              const isActive = pageNumber === currentPage;
              
              return (
                <Button
                  key={pageNumber}
                  variant={isActive ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => onPageChange(pageNumber)}
                  className={`px-3 py-1 min-w-[36px] ${
                    isActive 
                      ? 'bg-jne-red hover:bg-red-700 text-white font-semibold' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          {/* Next page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext}
            className="px-3 py-1"
          >
            Siguiente
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>

          {/* Last page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={!hasNext}
            className="px-2 py-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};