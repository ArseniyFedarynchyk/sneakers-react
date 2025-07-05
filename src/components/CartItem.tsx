import SneakersLogo from "../assets/sneakers/sneakers-1.jpg";
import CloseIcon from "../assets/close.svg";
import type { Sneaker } from "../models/sneaker.model";

interface CartItemProps {
  cartItem: Sneaker;
  removeFromCart: (item: Sneaker) => void;
}

export default function CartItem({ cartItem, removeFromCart }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 w-full border border-slate-200 p-4 rounded-xl">
      <img className="w-16" src={SneakersLogo} alt="Sneaker logo" />
      <div className="flex flex-col flex-1">
        <p>{cartItem.title}</p>
        <div className="flex justify-between mt-2">
          <b className="flex-1">{cartItem.price} USD</b>
          <img
            className="opacity-40 hover:opacity-100 cursor-pointer transition"
            src={CloseIcon}
            alt="Remove sneakers from the cart"
            onClick={() => removeFromCart(cartItem)}
          />
        </div>
      </div>
    </div>
  );
}
