import { useContext } from "react";
import Card from "./Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SneakerContext } from "../store/SneakerContext";

export default function CardList() {
  const { sneakers } = useContext(SneakerContext);
  const [parent] = useAutoAnimate();

  return (
    <div className="grid grid-cols-4 gap-5 mt-10" ref={parent}>
      {sneakers.map((sneaker) => (
        <Card
          key={sneaker.id}
          sneaker={sneaker}
          title={sneaker.title}
          price={sneaker.price}
          imageUrl={sneaker.imageUrl}
          isFavorite={sneaker.isFavorite}
          isAdded={sneaker.isAdded}
        />
      ))}
    </div>
  );
}
