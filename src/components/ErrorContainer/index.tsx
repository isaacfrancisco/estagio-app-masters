import SadIcon from '../../assets/sad.svg';
import './error.css';

const ErrorContainer = ({ message }: { message: string }) => {
  return (
    <div>
      <div className='error_container'>
        <img src={SadIcon} alt='error_icon' />
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default ErrorContainer;
