export interface PaginationProps {
  totalGames: number;
  gamesPerPage: number;
  setCurrentPage: (value: number) => void;
}
