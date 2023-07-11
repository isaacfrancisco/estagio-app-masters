import { SearchInputProps } from '~/interfaces/SearchInputProps';
import './SearchInput.css';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ search, handleSearchChange }: SearchInputProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor='outlined-adornment-search'>Buscar</InputLabel>
      <OutlinedInput
        id='outlined-adornment-search'
        label='Buscar'
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        value={search}
        onChange={handleSearchChange}
      />
    </FormControl>
  );
};

export default SearchInput;
