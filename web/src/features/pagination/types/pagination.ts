export interface PaginationControlProps {
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetPage: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
