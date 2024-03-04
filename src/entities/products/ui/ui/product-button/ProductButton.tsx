import { ProductSchema } from '@/entities/product';
import { AppButton } from '@/shared/ui/app-button/AppButton';

interface ProductButtonProps {
  addingStatus: string;
  btnOpt: object;
  isButton: boolean;
  onAddToCart: () => void;
  onHandleCounter: () => void;
  product: ProductSchema;
}

export const ProductButton = ({
  addingStatus,
  btnOpt = {},
  isButton,
  onAddToCart,
  onHandleCounter,
  product,
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
          onClick={() => onAddToCart(product)}
          disabled={addingStatus === 'loading'}
          className='success bg-gradient mt-auto w-100'
        >
          <span className={addingStatus === 'loading' ? 'd-none' : ''}>Add to cart</span>

          {addingStatus === 'loading' && (
            <div
              role='status'
              className='spinner-border text-primary'
              style={{ height: '1rem', width: '1rem' }}
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
            onClick={(e) => clickHandler(e, product.id)}
            className={['warning', btnOpt.btn].join(' ')}
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
          <div className='text-center px-1 w-25'>{product.count}</div>
          <AppButton
            data-counter='increase'
            myClass={['warning', btnOpt.btn].join(' ')}
            onClick={(e) => clickHandler(e, product.id)}
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
        </div>
      )}
    </>
  );
};
