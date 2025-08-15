import { useContext } from "react";
import { getImageSource } from "../helper";
import type { Sneaker } from "../models/sneaker.model";
import { SneakerContext } from "../store/SneakerContext";
import Button from "./Button";

interface SneakerDetailProps {
  sneakerSelected: Sneaker;
}

export default function SneakerDetail({ sneakerSelected }: SneakerDetailProps) {
  const { addToFavorites, onClickAddPlus } = useContext(SneakerContext);
  const sneakerImage = getImageSource(sneakerSelected.imageUrl);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center">
      <img src={sneakerImage} alt="Sneaker logo" />
      <div className="p-4 md:w-1/2">
        <div className="font-bold text-xl mb-2">{sneakerSelected.title}</div>
        <p className="text-gray-700 text-base mb-4">
          {sneakerSelected.description}
        </p>
        <div className="text-lg font-semibold mb-4">{`Price: ${sneakerSelected.price}$`}</div>
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => onClickAddPlus(sneakerSelected)}
            isPrimary={true}
          >
            {sneakerSelected.isAdded ? "Remove from Cart" : "Add to Cart"}
          </Button>
          <Button onClick={() => addToFavorites(sneakerSelected)}>
            {sneakerSelected.isFavorite
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </Button>
        </div>
      </div>
    </div>
  );
}
