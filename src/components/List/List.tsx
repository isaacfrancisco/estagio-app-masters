import { ReactNode } from 'react';
import './List.css';

const List = ({ children }: { children: ReactNode }) => {
  return <div className='list'>{children}</div>;
};

export default List;
