import type { Sneaker } from "../models/sneaker.model";
import CartItemList from "./CartItemList";
import DrawerHeader from "./DrawerHeader";

interface DrawerProps {
  cartItems: Sneaker[];
  toggleCart: () => void;
}

export default function Drawer({ cartItems, toggleCart }: DrawerProps) {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"
        onClick={toggleCart}
      ></div>
      <div className="fixed top-0 right-0 z-20 bg-white w-96 h-full p-8">
        <DrawerHeader toggleCart={toggleCart} />
        <CartItemList cartItems={cartItems} />

        <div className="flex justify-between mb-6 mt-7">
          <p>Sum:</p>
          <div className="flex-1"></div>
          <p>120 USD</p>
        </div>

        <button
          disabled={cartItems.length === 0}
          className="mt-4 transition bg-lime-500 w-full rounded-xl cursor-pointer py-3 disabled:bg-slate-400 text-white hover:bg-lime-600 active:bg-lime-700"
        >
          Checkout
        </button>
      </div>
    </>
  );
}
