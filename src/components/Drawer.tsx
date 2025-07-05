import type { Sneaker } from "../models/sneaker.model";
import CartItemList from "./CartItemList";
import DrawerHeader from "./DrawerHeader";
import InfoBlock from "./InfoBlock";

interface DrawerProps {
  cartItems: Sneaker[];
  totalPrice: number;
  isOrderCreating: boolean;
  toggleCart: () => void;
  removeFromCart: (item: Sneaker) => void;
  createOrder: () => void;
}

export default function Drawer({
  cartItems,
  totalPrice,
  isOrderCreating,
  toggleCart,
  removeFromCart,
  createOrder,
}: DrawerProps) {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"
        onClick={toggleCart}
      ></div>
      <div className="fixed top-0 right-0 z-20 bg-white w-96 h-full p-8">
        <DrawerHeader toggleCart={toggleCart} />
        {totalPrice === 0 ? (
          <div className="flex h-full items-center">
            <InfoBlock
              title="Cart is empty"
              description="Add some sneakers to make an order"
            />
          </div>
        ) : (
          <div>
            <CartItemList
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />

            <div>
              <div className="flex justify-between mb-6 mt-7">
                <p>Sum:</p>
                <div className="flex-1"></div>
                <p>{totalPrice} USD</p>
              </div>
              <button
                disabled={cartItems.length === 0 || isOrderCreating}
                className="mt-4 transition bg-lime-500 w-full rounded-xl cursor-pointer py-3 disabled:bg-slate-400 text-white hover:bg-lime-600 active:bg-lime-700"
                onClick={createOrder}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
