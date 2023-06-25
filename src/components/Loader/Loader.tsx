import FlexContainer from '../FlexContainer/FlexContainer';
import './Loader.css';

const Loader = () => {
  return (
    <FlexContainer>
      <div className='loader'></div>
      <h1>Carregando...</h1>
    </FlexContainer>
  );
};

export default Loader;
