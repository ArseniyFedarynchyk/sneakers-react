import PlusIcon from "../assets/plus.svg";
import CheckedIcon from "../assets/checked.svg";
import FavoriteIcon from "../assets/like-1.svg";
import FavoriteAddedIcon from "../assets/like-2.svg";
import SneakerLogo from "../assets/sneakers/sneakers-1.jpg";
import type { Sneaker } from "../models/sneaker.model";
import { useContext } from "react";
import { SneakerContext } from "../store/SneakerContext";

interface CardProps {
  sneaker: Sneaker;
  title: string;
  imageUrl?: string;
  price: number;
  isFavorite?: boolean;
  isAdded?: boolean;
  isFavorites: boolean;
}

export default function Card({
  sneaker,
  title,
  price,
  isFavorite,
  isAdded,
  isFavorites,
}: CardProps) {
  const { addToFavorites, onClickAddPlus } = useContext(SneakerContext);

  return (
    <div className="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
      {!isFavorites && (
        <img
          src={isFavorite ? FavoriteAddedIcon : FavoriteIcon}
          alt="Add to favorite icon"
          className="absolute top-8 left-8 cursor-pointer"
          onClick={() => addToFavorites(sneaker)}
        />
      )}
      <img src={SneakerLogo} alt="sneaker photo" />
      <p className="mb-5">{title}</p>
      <div className="flex justify-between">
        <div>
          <p className="text-slate-400">Price</p>
          <p className="font-semibold">{price}$</p>
        </div>
        {!isFavorites && (
          <img
            src={!isAdded ? PlusIcon : CheckedIcon}
            alt="Add to a cart"
            className="cursor-pointer"
            onClick={() => onClickAddPlus(sneaker)}
          />
        )}
      </div>
    </div>
  );
}
