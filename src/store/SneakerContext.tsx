import { createContext } from "react";
import type { Sneaker } from "../models/sneaker.model";
import type { ShippingDetails } from "../models/shippingDetails.model";

interface SneakerContext {
  sneakers: Sneaker[];
  favorites: Sneaker[];
  error: string | null;
  isLoading: boolean;
  filters: { sortBy: string; searchQuerry: string };
  isCartOpen: boolean;
  cartItems: Sneaker[];
  totalPrice: number;
  isOrderCreating: boolean;
  orderId: number | null;
  addToFavorites: (item: Sneaker) => void;
  createOrder: (shippingDetails: ShippingDetails) => void;
  removeFromCart: (item: Sneaker) => void;
  onClickAddPlus: (item: Sneaker) => void;
  handleChangeSelect: (sortBy: string) => void;
  handleChangeSearchQuerry: (searchQuerry: string) => void;
  toggleCart: () => void;
}

export const SneakerContext = createContext<SneakerContext>({
  sneakers: [],
  favorites: JSON.parse(localStorage.getItem("favorites")!) || [],
  error: null,
  isLoading: false,
  filters: { sortBy: "title", searchQuerry: "" },
  isCartOpen: false,
  cartItems: [],
  totalPrice: 0,
  isOrderCreating: false,
  orderId: null,
  addToFavorites: () => {},
  createOrder: () => {},
  removeFromCart: () => {},
  onClickAddPlus: () => {},
  handleChangeSelect: () => {},
  handleChangeSearchQuerry: () => {},
  toggleCart: () => {},
});
