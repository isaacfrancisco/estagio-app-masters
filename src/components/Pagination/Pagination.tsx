import { PaginationProps } from '~/interfaces/PaginationProps';
import PaginationContainer from '../PaginationContainer/PaginationContainer';
import './Pagination.css';

const Pagination = ({ totalGames, gamesPerPage, setCurrentPage }: PaginationProps) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pages.push(i);
  }
  return (
    <PaginationContainer>
      {pages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination;
