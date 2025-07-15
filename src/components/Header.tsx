import Logo from "../assets/logo.png";
import CartIcon from "../assets/cart.svg";
import ProfileIcon from "../assets/profile.svg";
import FavoritesIcon from "../assets/heart.svg";
import { useContext } from "react";
import { SneakerContext } from "../store/SneakerContext";
import { Link } from "react-router";

export default function Header() {
  const { totalPrice, toggleCart } = useContext(SneakerContext);

  return (
    <header className="sticky top-0 z-5 bg-white flex justify-between border-b border-slate-200 px-5 sm:px-10 py-4">
      <Link to="/">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="Logo" className="w-11" />
          <div>
            <h2 className="font-bold md:text-xl uppercase">React sneakers</h2>
            <p className="hidden sm:block text-slate-400">
              The best sneakers shop ever!
            </p>
          </div>
        </div>
      </Link>
      <ul className="flex items-center gap-5">
        <li
          className="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
          onClick={toggleCart}
        >
          <img src={CartIcon} alt="Cart" />
          <b className="hidden md:block">{totalPrice} USD</b>
        </li>
        <Link to="/favorites">
          <li className="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
            <img src={FavoritesIcon} alt="Favorite" />
            <span className="hidden md:block">Favorites</span>
          </li>
        </Link>
        <li className="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src={ProfileIcon} alt="Profile" />
          <span className="hidden md:block">Profile</span>
        </li>
      </ul>
    </header>
  );
}
