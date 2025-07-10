import PlusIcon from "../assets/plus.svg";
import CheckedIcon from "../assets/checked.svg";
import FavoriteIcon from "../assets/like-1.svg";
import FavoriteAddedIcon from "../assets/like-2.svg";
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

import sneaker1 from "../assets/sneakers/sneakers-1.jpg";
import sneaker2 from "../assets/sneakers/sneakers-2.jpg";
import sneaker3 from "../assets/sneakers/sneakers-3.jpg";
import sneaker4 from "../assets/sneakers/sneakers-4.jpg";
import sneaker5 from "../assets/sneakers/sneakers-5.jpg";
import sneaker6 from "../assets/sneakers/sneakers-6.jpg";
import sneaker7 from "../assets/sneakers/sneakers-7.jpg";
import sneaker8 from "../assets/sneakers/sneakers-8.jpg";
import sneaker9 from "../assets/sneakers/sneakers-9.jpg";
import sneaker10 from "../assets/sneakers/sneakers-10.jpg";
import sneaker11 from "../assets/sneakers/sneakers-11.jpg";
import sneaker12 from "../assets/sneakers/sneakers-12.jpg";

const sneakerImages = {
  "sneakers-1": sneaker1,
  "sneakers-2": sneaker2,
  "sneakers-3": sneaker3,
  "sneakers-4": sneaker4,
  "sneakers-5": sneaker5,
  "sneakers-6": sneaker6,
  "sneakers-7": sneaker7,
  "sneakers-8": sneaker8,
  "sneakers-9": sneaker9,
  "sneakers-10": sneaker10,
  "sneakers-11": sneaker11,
  "sneakers-12": sneaker12,
};

const getImageSource = (url?: string) => {
  if (!url) return null;
  const sneakerKey = url.split("/").pop();

  if (sneakerKey && sneakerKey in sneakerImages) {
    return sneakerImages[sneakerKey];
  }

  return null;
};

export default function Card({
  sneaker,
  title,
  price,
  isFavorite,
  isAdded,
  isFavorites,
  imageUrl,
}: CardProps) {
  const { addToFavorites, onClickAddPlus } = useContext(SneakerContext);
  const sneakerImage = getImageSource(imageUrl);

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
      <img src={sneakerImage} alt="sneaker photo" />
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
