import CartItem from "./CartItem";

export default function CartItemList() {
  return (
    <div className="flex flex-col gap-4">
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
}
