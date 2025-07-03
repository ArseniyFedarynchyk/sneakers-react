import SneakersLogo from "../assets/sneakers/sneakers-1.jpg";
import CloseIcon from "../assets/close.svg";

export default function CartItem() {
  return (
    <div className="flex items-center gap-4 w-full border border-slate-200 p-4 rounded-xl">
      <img className="w-16" src={SneakersLogo} alt="" />
      <div className="flex flex-col">
        <p>Man's sneakers Nike Air Max 200</p>
        <div className="flex justify-between mt-2">
          <b>120 USD</b>
          <img
            className="opacity-40 hover:opacity-100 cursor-pointer transition"
            src={CloseIcon}
            alt="Remove sneakers from the cart"
          />
        </div>
      </div>
    </div>
  );
}
