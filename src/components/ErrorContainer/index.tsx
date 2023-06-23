import SadIcon from '../../assets/sad.svg';
import './error.css';

const ErrorContainer = ({ statusCode }: { statusCode: number }) => {
  const responseErrors = [500, 502, 503, 504, 507, 508, 509];
  const message = responseErrors.includes(statusCode)
    ? ' O servidor falhou em responder, tente recarregar a página'
    : 'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde';

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
