// import { Link } from "react-router-dom";

import { Link } from 'react-router-dom';

import { PathRoute } from '@/app/providers/router';

export const Header = () => {
  return (
    <header className='p-3 text-bg-dark bg-dark'>
      <div className='container'>
        <ul className='nav align-items-center justify-content-between'>
          <Link
            to={PathRoute.MAIN}
            className='nav-link px-2 text-white'
          >
            Home
          </Link>

          <Link
            to={PathRoute.CART}
            style={{ height: '38px', width: '38px' }}
            className='position-relative bg-white rounded-circle d-flex'
          >
            {/* <span
							className="position-absolute top-0 start-100 badge rounded-pill bg-danger"
							style={{
								transform: "translate(-30%, -45%)",
							}}
						>
							99+
						</span> */}
            <svg
              width='20'
              height='20'
              fill='#ffc107'
              viewBox='0 0 16 16'
              className='bi bi-cart3 m-auto'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
            </svg>
          </Link>
        </ul>
      </div>
    </header>
  );
};
