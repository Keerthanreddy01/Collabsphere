'use client';

import { useState, useCallback, useMemo } from 'react';

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

/**
 * Custom hook for pagination
 * Manages page state and provides pagination utilities
 */
export const usePagination = <T,>(items: T[], initialPageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Validate current page
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const paginatedItems = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }, [items, validCurrentPage, pageSize]);

  const goToPage = useCallback(
    (page: number) => {
      const pageNum = Math.max(1, Math.min(page, totalPages || 1));
      setCurrentPage(pageNum);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    goToPage(validCurrentPage + 1);
  }, [validCurrentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(validCurrentPage - 1);
  }, [validCurrentPage, goToPage]);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setCurrentPage(totalPages || 1);
  }, [totalPages]);

  const changePageSize = useCallback((newSize: number) => {
    setPageSize(Math.max(1, newSize));
    setCurrentPage(1);
  }, []);

  const reset = useCallback(() => {
    setCurrentPage(1);
    setPageSize(initialPageSize);
  }, [initialPageSize]);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, validCurrentPage - 1);
      let endPage = Math.min(totalPages - 1, validCurrentPage + 1);

      if (startPage > 2) {
        pages.push(-1); // Ellipsis
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push(-1); // Ellipsis
      }

      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, validCurrentPage]);

  const state: PaginationState = {
    currentPage: validCurrentPage,
    pageSize,
    totalItems,
  };

  return {
    // State
    ...state,
    totalPages,
    paginatedItems,

    // Actions
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    changePageSize,
    reset,

    // Utilities
    pageNumbers,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1,
    startIndex: (validCurrentPage - 1) * pageSize + 1,
    endIndex: Math.min(validCurrentPage * pageSize, totalItems),
  };
};
