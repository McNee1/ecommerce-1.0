import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';

export const Root = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </>
  );
};
