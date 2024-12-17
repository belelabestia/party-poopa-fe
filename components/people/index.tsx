import { NavLink } from 'react-router';

export const People = () => {
  return (
    <div className='people'>
      <h2>People</h2>
      <nav>
        <NavLink to='/home'>Home</NavLink>
        <p>Work in progress</p>
      </nav>
    </div>
  );
};