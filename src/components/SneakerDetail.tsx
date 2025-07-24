import { getImageSource } from "../helper";
import type { Sneaker } from "../models/sneaker.model";

interface SneakerDetailProps {
  sneakerSelected: Sneaker;
}

export default function SneakerDetail({ sneakerSelected }: SneakerDetailProps) {
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
        <div className="flex justify-between">
          <button className="bg-lime-500 text-white font-bold py-2 px-4 rounded hover:bg-lime-600 active:bg-lime-700 cursor-pointer">
            Add to Cart
          </button>
          <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 cursor-pointer">
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}
