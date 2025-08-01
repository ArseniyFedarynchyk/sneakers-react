import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { Sneaker } from "../models/sneaker.model";
import { API_URL } from "../App";
import SneakerDetail from "../components/SneakerDetail";

export default function SneakerDetailsPage() {
  const sneakerSelected: Sneaker = useLoaderData();

  return <SneakerDetail sneakerSelected={sneakerSelected} />;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`${API_URL}/items/${params.sneakerId}`);
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  const data: Sneaker = await response.json();

  const storedCartItems = localStorage.getItem("cartItems");
  const cartItems: Sneaker[] = storedCartItems
    ? JSON.parse(storedCartItems)
    : [];

  const storedFavorites = localStorage.getItem("favorites");
  const favorites: Sneaker[] = storedFavorites
    ? JSON.parse(storedFavorites)
    : [];

  const sneaker: Sneaker = {
    ...data,
    isFavorite: favorites.find((favorite) => favorite.id === data.id)
      ? true
      : false,
    isAdded: cartItems.find((cartItem) => cartItem.id === data.id)
      ? true
      : false,
  };

  return sneaker;
}
