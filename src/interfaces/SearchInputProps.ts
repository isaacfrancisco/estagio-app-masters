import { ChangeEvent } from 'react';

export interface SearchInputProps {
  search: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
