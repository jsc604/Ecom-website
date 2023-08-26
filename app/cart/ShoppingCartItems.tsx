import { Divider } from '@mui/material';
import ShoppingCartItem from './ShoppingCartItem';
import { ItemInfo } from './page';

export default function ShoppingCartItems({ cartItemsInfo }: { cartItemsInfo: ItemInfo[] }) {

  return (
    <div>
      {cartItemsInfo && cartItemsInfo.map((item, index: number) => {
        const isLastItem = index === cartItemsInfo.length - 1;
        return (
          <div key={index}>
            <Divider />
            <ShoppingCartItem
              image={item.product.featuredImage}
              id={item.product._id}
              slug={item.product.slug}
              category={item.product.category}
              brand={item.product.brand}
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
