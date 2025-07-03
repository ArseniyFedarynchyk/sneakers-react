import CartItemList from "./CartItemList";
import DrawerHeader from "./DrawerHeader";

export default function Drawer() {
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
      <div className="fixed top-0 right-0 z-20 bg-white w-96 h-full p-8">
        <DrawerHeader />
        <CartItemList />
      </div>
    </>
  );
}
