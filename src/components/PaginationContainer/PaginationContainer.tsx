import { ReactNode } from 'react';
import './PaginationContainer.css';

const PaginationContainer = ({ children }: { children: ReactNode }) => {
  return <div className='pagination'>{children}</div>;
};

export default PaginationContainer;
