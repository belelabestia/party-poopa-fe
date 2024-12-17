import { AppContext } from 'components/app';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

type Person = { name: string };
type State = { people: Person[] };

export const People = () => {
  const nav = useNavigate();
  const app = useContext(AppContext);
  const [state, setState] = useState<State | null>(null);

  const init = async () => {

  };

  return (
    <div className='events'>
      <h2>Events</h2>
      <nav>
        <NavLink to='/home'>Home</NavLink>
        <p>Work in progress</p>
      </nav>
    </div>
  );
};