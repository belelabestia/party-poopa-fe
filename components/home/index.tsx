import { NavLink } from 'react-router';

export const Home = () => {



  return (
    <div className='home'>
      <h2>Home</h2>
      <nav>
        <NavLink to='/events'>Events</NavLink>
        <NavLink to='/admins'>Admins</NavLink>
      </nav>
    </div>
  );
};