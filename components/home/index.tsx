import { NavLink } from 'react-router';
import './styles.css';

export const Home = () => (
  <div className='home'>
    <header>
      <h2>Home</h2>
    </header>
    <nav>
      <NavLink to='/events'>Events</NavLink>
      <NavLink to='/admins'>Admins</NavLink>
    </nav>
  </div>
);
