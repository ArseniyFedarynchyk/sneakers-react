import type { Sneaker } from "../models/sneaker.model";
import CartItem from "./CartItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface CartItemListProps {
  cartItems: Sneaker[];
  removeFromCart: (item: Sneaker) => void;
}

export default function CartItemList({
  cartItems,
  removeFromCart,
}: CartItemListProps) {
  const [parent] = useAutoAnimate();

  return (
    <div className="flex flex-col gap-4" ref={parent}>
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
