import type { Sneaker } from "../models/sneaker.model";
import Card from "./Card";

interface CardListProps {
  sneakers: Sneaker[];
  addToFavorites: (item: Sneaker) => void;
  addToCart: (item: Sneaker) => void;
}

export default function CardList({
  sneakers,
  addToFavorites,
  addToCart,
}: CardListProps) {
  return (
    <div className="grid grid-cols-4 gap-5 mt-10">
      {sneakers.map((sneaker) => (
        <Card
          key={sneaker.id}
          sneaker={sneaker}
          title={sneaker.title}
          price={sneaker.price}
          imageUrl={sneaker.imageUrl}
          isFavorite={sneaker.isFavorite}
          addToFavorites={addToFavorites}
          addToCart={addToCart}
          isAdded={sneaker.isAdded}
        />
      ))}
    </div>
  );
}
