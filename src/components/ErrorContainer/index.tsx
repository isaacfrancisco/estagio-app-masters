import SadIcon from '../../assets/sad.svg';
import FlexContainer from '../FlexContainer';
import './styles.css';

const ErrorContainer = ({ message }: { message: string }) => {
  return (
    <FlexContainer>
      <img src={SadIcon} alt='error_icon' />
      <h1>{message}</h1>
    </FlexContainer>
  );
};

export default ErrorContainer;
