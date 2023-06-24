import { ReactNode } from 'react';
import './ListItem.css';

const ListItem = ({ children }: { children: ReactNode }) => {
  return <div className='list-item'>{children}</div>;
};

export default ListItem;
