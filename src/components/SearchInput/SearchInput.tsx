import { SearchInputProps } from '~/interfaces/SearchInputProps';
import './SearchInput.css';

const SearchInput = ({ search, handleSearchChange }: SearchInputProps) => {
  return (
    <div className='search-header'>
      <input className='search-box' type='text' value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchInput;
