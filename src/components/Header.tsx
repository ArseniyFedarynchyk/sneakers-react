import Logo from "../assets/logo.png";
import CartIcon from "../assets/cart.svg";
import ProfileIcon from "../assets/profile.svg";
import FavoritesIcon from "../assets/heart.svg";

interface HeaderProps {
  totalPrice: number;
  toggleCart: () => void;
}

export default function Header({ totalPrice, toggleCart }: HeaderProps) {
  return (
    <header className="flex justify-between border-b border-slate-200 px-10 py-4">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="Logo" className="w-11" />
        <div>
          <h2 className="font-bold text-xl uppercase">React sneakers</h2>
          <p className="text-slate-400">The best sneakers shop ever!</p>
        </div>
      </div>
      <ul className="flex items-center gap-10">
        <li
          className="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
          onClick={toggleCart}
        >
          <img src={CartIcon} alt="Cart" />
          <b>{totalPrice} USD</b>
        </li>
        <li className="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src={FavoritesIcon} alt="Favorite" />
          <span>Favorites</span>
        </li>
        <li className="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src={ProfileIcon} alt="Profile" />
          <span>Profile</span>
        </li>
      </ul>
    </header>
  );
}
