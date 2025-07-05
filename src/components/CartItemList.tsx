import type { Sneaker } from "../models/sneaker.model";
import CartItem from "./CartItem";

interface CartItemListProps {
  cartItems: Sneaker[];
  removeFromCart: (item: Sneaker) => void;
}

export default function CartItemList({
  cartItems,
  removeFromCart,
}: CartItemListProps) {
  return (
    <div className="flex flex-col gap-4">
      {cartItems &&
        cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            removeFromCart={removeFromCart}
          />
        ))}
    </div>
  );
}
