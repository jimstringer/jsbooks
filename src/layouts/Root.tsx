import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';

export const Root = () => {
  return (
    <div className='container mx-auto px-1 mt-5 bg-blue-300'>
      <NavBar />
      <Outlet />
    </div>
  );
};
