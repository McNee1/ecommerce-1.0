import { SmCard } from '@/entities/cart';
import { CartData } from '@/entities/cart/model/types/cart-type';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

interface CardListProps {
  onChecked: (check: boolean, product: CartData) => void;

  onDecreaseCount: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onIncreaseCount: (id: string) => void;

  shoppingCart: CartData[];
}

export const CardList = ({
  onDecreaseCount,
  onDeleteProduct,
  onIncreaseCount,
  onChecked,
  shoppingCart,
}: CardListProps) => {
  return (
    <div className='cart-list'>
      {shoppingCart?.map((product, id) => (
        <div
          key={product.id}
          className='d-flex flex-row mb-2'
        >
          <Checkbox
            id={id}
            onChecked={(check: boolean) => onChecked(check, product)}
          />
          <SmCard
            id={id}
            product={product}
            onIncreaseCount={onIncreaseCount}
            onDecreaseCount={onDecreaseCount}
            onDeleteProduct={onDeleteProduct}
          />
        </div>
      ))}
    </div>
  );
};
