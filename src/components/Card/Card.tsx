import { CardProps } from '~/interfaces/CardProps';
import './Card.css';

const Card = ({ image, title, description }: CardProps) => {
  return (
    <div className='card'>
      <img src={image} alt='' />
      <div className='card-content'>
        <h2 className='card-title'>{title}</h2>
        <p className='card-text'>{description}</p>
      </div>
    </div>
  );
};

export default Card;
