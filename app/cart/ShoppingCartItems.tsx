'use client'
import { Divider } from '@mui/material';
import { ItemInfo } from './CartContainer';
import ShoppingCartItem from './ShoppingCartItem';

interface PageProps {
  cartItemsInfo: ItemInfo[];
}

export default function ShoppingCartItems({ cartItemsInfo }: PageProps) {

  return (
    <div>
      {cartItemsInfo && cartItemsInfo.map((item, index: number) => {
        const isLastItem = index === cartItemsInfo.length - 1;
        return (
          <div key={index}>
            <Divider />
            <ShoppingCartItem
              image={item.product.image}
              id={item.product._id}
              slug={item.product.slug}
              category={item.product.category}
              name={item.product.name}
              size={item.product.options[item.optionIndex].size}
              price={item.product.options[item.optionIndex].price}
              subtotal={item.product.options[item.optionIndex].price * item.quantity}
              quantity={item.quantity}
              countInStock={item.product.options[item.optionIndex].countInStock}
            />
            {isLastItem && <Divider />}
          </div>
        )
      })}
    </div>
  )
}
