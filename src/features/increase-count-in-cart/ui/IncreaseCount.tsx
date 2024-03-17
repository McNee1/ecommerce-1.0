import { useIncreaseCount } from '../model/hook/use-increase-count';

import { AppButton } from '@/shared/ui/app-button/AppButton';

interface IncreaseCountProps {
  id: number;
}

export const IncreaseCountInCart = ({ id }: IncreaseCountProps) => {
  const { handleIncreaseCount } = useIncreaseCount();

  return (
    <AppButton
      className='btn-warning p-1'
      onClick={() => handleIncreaseCount(id)}
    >
      <svg
        width='15'
        height='16'
        fill='currentColor'
        viewBox='0 0 16 16'
        className='bi bi-plus-lg'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'
        />
      </svg>
    </AppButton>
  );
};
