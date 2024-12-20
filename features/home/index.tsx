import { NavLink } from 'react-router';
import './styles.css';
import { Icon } from '../icon';

export const Home = () => (
  <div className='home'>
    <header>
      <div>
        <nav>
          <Icon name='home' />
        </nav>
        <h2>Home</h2>
      </div>
    </header>
    <nav>
      <NavLink to='/events'>Events</NavLink>
      <NavLink to='/admins'>Admins</NavLink>
    </nav>
  </div>
);
