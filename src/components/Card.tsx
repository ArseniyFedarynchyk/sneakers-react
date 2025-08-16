import PlusIcon from "../assets/plus.svg";
import CheckedIcon from "../assets/checked.svg";
import FavoriteIcon from "../assets/like-1.svg";
import FavoriteAddedIcon from "../assets/like-2.svg";
import type { Sneaker } from "../models/sneaker.model";
import { useContext } from "react";
import { SneakerContext } from "../store/SneakerContext";
import { useNavigate } from "react-router";
import { getImageSource } from "../helper";

interface CardProps {
  sneaker: Sneaker;
  title: string;
  imageUrl: string;
  price: number;
  isFavorite?: boolean;
  isAdded?: boolean;
}

export default function Card({
  sneaker,
  title,
  price,
  isFavorite,
  isAdded,
  imageUrl,
}: CardProps) {
  const { addToFavorites, onClickAddPlus, handleSelectSneaker } =
    useContext(SneakerContext);
  const sneakerImage = getImageSource(imageUrl);
  const navigate = useNavigate();

  function redirectToDetailsPage() {
    handleSelectSneaker(sneaker);
    navigate("/sneakers/" + sneaker.id);
  }

  return (
    <div
      className="relative flex flex-col justify-between bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
      onClick={redirectToDetailsPage}
    >
      <img
        src={isFavorite ? FavoriteAddedIcon : FavoriteIcon}
        alt="Add to favorite icon"
        className="absolute top-8 left-8 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          addToFavorites(sneaker);
        }}
      />
      <img src={sneakerImage} alt="sneaker photo" />
      <p className="mb-5">{title}</p>
      <div className="flex justify-between">
        <div>
          <p className="text-slate-400">Price</p>
          <p className="font-semibold">{price}$</p>
        </div>
        <img
          src={!isAdded ? PlusIcon : CheckedIcon}
          alt="Add to a cart"
          className="cursor-pointer"
          width="30"
          height="30"
          onClick={(e) => {
            e.stopPropagation();
            onClickAddPlus(sneaker);
          }}
        />
      </div>
    </div>
  );
}
