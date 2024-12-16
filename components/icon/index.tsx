import { useState } from 'react';
import './styles.css';

type Props = { name: string };

export const Icon = (props: Props) => {
  const [error, setError] = useState(false);
  const src = `/icons/${props.name}.svg`;

  const notify = () => {
    console.error('coult not fetch image', { name: props.name, src });
    setError(true);
  };

  return (
    error
      ? null
      : <img src={src} alt={props.name} onError={notify} className='icon' />
  );
};
