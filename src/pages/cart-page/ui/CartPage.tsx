import { useAppDispatch, useAppSelector } from '@/app/hook/hooks';
import { AppButton } from '@/shared/ui/app-button/AppButton';

import { counterAction, getCounter } from '../counter';

export const CartPage = () => {
  const a = useAppSelector(getCounter);
  const dispatch = useAppDispatch();

  const increment = () => dispatch(counterAction.increment());

  const decrement = () => dispatch(counterAction.decrement());

  const incrementByAmount = () => dispatch(counterAction.incrementByAmount(5));

  return (
    <>
      <p className='h5'>{a}</p>
      <AppButton
        className='danger'
        onClick={increment}
      >
        increment
      </AppButton>
      <AppButton
        className='dark'
        onClick={decrement}
      >
        decrement
      </AppButton>
      <AppButton
        className='success'
        onClick={incrementByAmount}
      >
        incrementByAmount
      </AppButton>
    </>
  );
};
