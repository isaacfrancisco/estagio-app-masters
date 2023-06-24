import { ChangeEvent } from 'react';
import './input.css';

const SearchInput = ({
  search,
  handleSearchChange,
}: {
  search: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className='search-header'>
      <input className='search-box' type='text' value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchInput;
