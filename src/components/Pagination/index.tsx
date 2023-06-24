import './styles.css';

const Pagination = ({
  totalGames,
  gamesPerPage,
  setCurrentPage,
}: {
  totalGames: number;
  gamesPerPage: number;
  setCurrentPage: (value: number) => void;
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className='pagination'>
      {pages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
