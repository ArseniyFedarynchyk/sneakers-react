import SneakersLogo from "../assets/sneakers/sneakers-1.jpg";
import PlusIcon from "../assets/plus.svg";
import FavoriteIcon from "../assets/like-1.svg";

export default function Card() {
  return (
    <div className="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
      <img
        src={FavoriteIcon}
        alt="Add to favorite icon"
        className="absolute top-8 left-8 cursor-pointer"
      />
      <img src={SneakersLogo} alt="sneaker photo" />
      <p className="mb-5">Man's sneakers Nike Blazer Mid Suede</p>
      <div className="flex justify-between">
        <div>
          <p className="text-slate-400">Price</p>
          <p className="font-semibold">120 USD</p>
        </div>
        <img
          src={PlusIcon}
          alt="Add to a cart icon"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
