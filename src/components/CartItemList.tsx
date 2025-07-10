import { useContext } from "react";
import CartItem from "./CartItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SneakerContext } from "../store/SneakerContext";

export default function CartItemList() {
  const [parent] = useAutoAnimate();
  const { cartItems } = useContext(SneakerContext);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {cartItems &&
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
    </div>
  );
}
