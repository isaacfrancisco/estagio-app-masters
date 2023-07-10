import { DropdownFilterProps } from '~/interfaces/DropdownFilterProps';
import './DropdownFilter.css';

const DropdownFilter = ({
  genreSelected,
  handleDropdownChange,
  gamesGenre,
}: DropdownFilterProps) => {
  return (
    <select className='select-box' value={genreSelected} onChange={handleDropdownChange}>
      <option value=''>Selecione um gênero</option>
      {gamesGenre.map((genre, index) => {
        return (
          <option value={genre} key={index}>
            {genre}
          </option>
        );
      })}
    </select>
  );
};

export default DropdownFilter;
