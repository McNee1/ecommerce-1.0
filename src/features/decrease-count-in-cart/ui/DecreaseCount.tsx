import { useDecreaseCount } from '../model/hook/use-decrease-count';

import { AppButton } from '@/shared/ui/app-button/AppButton';

interface DecreaseCountInCartProps {
  id: number;
}

export const DecreaseCountInCart = ({ id }: DecreaseCountInCartProps) => {
  const { handleDecreaseCount } = useDecreaseCount();
  return (
    <AppButton
      className='btn-warning p-1'
      onClick={() => handleDecreaseCount(id)}
    >
      <svg
        width='16'
        height='16'
        fill='currentColor'
        viewBox='0 0 16 16'
        className='bi bi-dash-lg'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z'
        />
      </svg>
    </AppButton>
  );
};
