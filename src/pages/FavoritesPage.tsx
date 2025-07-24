import { useContext } from "react";
import { SneakerContext } from "../store/SneakerContext";
import CardList from "../components/CardList";

export default function FaoritesPage() {
  const { favorites } = useContext(SneakerContext);

  return (
    <>
      <h2 className="text-3xl font-bold">Favorites</h2>
      <CardList items={favorites} />
    </>
  );
}
