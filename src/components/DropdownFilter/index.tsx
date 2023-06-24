import { ChangeEvent } from 'react';

const DropdownFilter = ({
  genreSelected,
  handleDropdownChange,
  gamesGenre,
}: {
  genreSelected: string;
  handleDropdownChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  gamesGenre: string[];
}) => {
  return (
    <div>
      <select value={genreSelected} onChange={handleDropdownChange}>
        <option value=''>Selecione uma opção</option>
        {gamesGenre.map((genre, index) => {
          return (
            <option value={genre} key={index}>
              {genre}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownFilter;
