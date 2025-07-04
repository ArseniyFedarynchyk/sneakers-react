import PlusIcon from "../assets/plus.svg";
import CheckedIcon from "../assets/checked.svg";
import FavoriteIcon from "../assets/like-1.svg";
import FavoriteAddedIcon from "../assets/like-2.svg";
import SneakerLogo from "../assets/sneakers/sneakers-1.jpg";

interface CardProps {
  title?: string;
  imageUrl?: string;
  price?: number;
  isFavorite?: boolean;
  isAdded?: boolean;
}

export default function Card({
  title,
  price,
  isFavorite = false,
  isAdded = false,
}: CardProps) {
  return (
    <div className="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
      <img
        src={isFavorite ? FavoriteAddedIcon : FavoriteIcon}
        alt="Add to favorite icon"
        className="absolute top-8 left-8 cursor-pointer"
      />
      <img src={SneakerLogo} alt="sneaker photo" />
      <p className="mb-5">{title}</p>
      <div className="flex justify-between">
        <div>
          <p className="text-slate-400">Price</p>
          <p className="font-semibold">{price}</p>
        </div>
        <img
          src={!isAdded ? PlusIcon : CheckedIcon}
          alt="Add to a cart icon"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
