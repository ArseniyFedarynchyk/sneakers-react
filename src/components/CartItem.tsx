import CloseIcon from "../assets/close.svg";
import type { Sneaker } from "../models/sneaker.model";
import { useContext } from "react";
import { SneakerContext } from "../store/SneakerContext";

import sneaker1 from "../assets/sneakers/sneakers-1.jpg";
import sneaker2 from "../assets/sneakers/sneakers-2.jpg";
import sneaker3 from "../assets/sneakers/sneakers-3.jpg";
import sneaker4 from "../assets/sneakers/sneakers-4.jpg";
import sneaker5 from "../assets/sneakers/sneakers-5.jpg";
import sneaker6 from "../assets/sneakers/sneakers-6.jpg";
import sneaker7 from "../assets/sneakers/sneakers-7.jpg";
import sneaker8 from "../assets/sneakers/sneakers-8.jpg";
import sneaker9 from "../assets/sneakers/sneakers-9.jpg";
import sneaker10 from "../assets/sneakers/sneakers-10.jpg";
import sneaker11 from "../assets/sneakers/sneakers-11.jpg";
import sneaker12 from "../assets/sneakers/sneakers-12.jpg";

const sneakerImages = {
  "sneakers-1": sneaker1,
  "sneakers-2": sneaker2,
  "sneakers-3": sneaker3,
  "sneakers-4": sneaker4,
  "sneakers-5": sneaker5,
  "sneakers-6": sneaker6,
  "sneakers-7": sneaker7,
  "sneakers-8": sneaker8,
  "sneakers-9": sneaker9,
  "sneakers-10": sneaker10,
  "sneakers-11": sneaker11,
  "sneakers-12": sneaker12,
};

const getImageSource = (url?: string) => {
  if (!url) return null;
  const sneakerKey = url.split("/").pop();

  if (sneakerKey && sneakerKey in sneakerImages) {
    return sneakerImages[sneakerKey];
  }

  return null;
};

interface CartItemProps {
  cartItem: Sneaker;
}

export default function CartItem({ cartItem }: CartItemProps) {
  const { removeFromCart } = useContext(SneakerContext);
  const sneakerLogo = getImageSource(cartItem.imageUrl);

  return (
    <div className="flex items-center gap-4 w-full border border-slate-200 p-4 rounded-xl">
      <img className="w-16" src={sneakerLogo} alt="Sneaker logo" />
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
