import { ReactNode } from 'react';
import './FlexContainer.css';

const FlexContainer = ({ children }: { children: ReactNode }) => {
  return <div className='flex-container'>{children}</div>;
};

export default FlexContainer;
