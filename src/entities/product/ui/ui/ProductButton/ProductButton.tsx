import { ProductSchema } from '@/entities/product';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

interface ProductButtonProps {
  product: ProductSchema;
  addingStatus: string;
  btnOpt: object;
  isButton: boolean;
  onHandleCounter: () => void;
  onAddToCart: () => void;
}

export const ProductButton = ({
  product,
  addingStatus,
  isButton,
  onHandleCounter,
  onAddToCart,
  btnOpt = {},
}: ProductButtonProps) => {
  const clickHandler = (e, id) => {
    const btn = e.target.closest('button');
    if (btn.tagName == 'BUTTON') {
      onHandleCounter(id, btn.dataset.counter);
    }
  };
  return (
    <>
      {!product.count && isButton && (
        <AppButton
          className='success bg-gradient mt-auto w-100'
          onClick={() => onAddToCart(product)}
          disabled={addingStatus === 'loading'}
        >
          <span className={addingStatus === 'loading' ? 'd-none' : ''}>Add to cart</span>

          {addingStatus === 'loading' && (
            <div
              className='spinner-border text-primary'
              style={{ width: '1rem', height: '1rem' }}
              role='status'
            >
              <span className='visually-hidden'>Loading...</span>
            </div>
          )}
        </AppButton>
      )}
      {product.count >= 1 && (
        <div
          className={['btn-group align-items-center bg-warning', btnOpt?.btnGroup].join(
            ' '
          )}
        >
          <AppButton
            data-counter='decrease'
            className={['warning', btnOpt.btn].join(' ')}
            onClick={(e) => clickHandler(e, product.id)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-dash-lg'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z'
              />
            </svg>
          </AppButton>
          <div className='text-center px-1 w-25'>{product.count}</div>
          <AppButton
            data-counter='increase'
            myClass={['warning', btnOpt.btn].join(' ')}
            onClick={(e) => clickHandler(e, product.id)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='15'
              height='16'
              fill='currentColor'
              className='bi bi-plus-lg'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'
              />
            </svg>
          </AppButton>
        </div>
      )}
    </>
  );
};
