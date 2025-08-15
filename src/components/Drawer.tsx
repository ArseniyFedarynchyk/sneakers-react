import { useContext } from "react";
import CartItemList from "./CartItemList";
import DrawerHeader from "./DrawerHeader";
import InfoBlock from "./InfoBlock";
import { SneakerContext } from "../store/SneakerContext";
import { Link } from "react-router";
import Button from "./Button";

export default function Drawer() {
  const { cartItems, totalPrice, isOrderCreating, orderId, toggleCart } =
    useContext(SneakerContext);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"
        onClick={toggleCart}
      ></div>
      <div className="flex flex-col fixed top-0 right-0 z-20 bg-white w-96 h-full p-8">
        <DrawerHeader />
        {totalPrice === 0 || orderId ? (
          <div className="flex h-full items-center">
            {totalPrice === 0 && !orderId && (
              <InfoBlock
                title="Cart is empty"
                description="Add some sneakers to make an order"
                empty={true}
              />
            )}
            {orderId && (
              <InfoBlock
                title="Order was created"
                description="Your order will be delivered soon"
                empty={false}
              />
            )}
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <CartItemList />
            </div>
            <div>
              <div className="flex justify-between mb-6 mt-7">
                <p>Sum:</p>
                <div className="flex-1"></div>
                <p>{totalPrice} USD</p>
              </div>
              <Link to="checkout">
                <Button
                  disabled={cartItems.length === 0 || isOrderCreating}
                  onClick={() => toggleCart()}
                  isPrimary
                  isFull
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
