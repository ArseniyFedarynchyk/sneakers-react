import { createContext, useState, useCallback, useEffect } from "react";
import type { Sneaker } from "../models/sneaker.model";

interface Props {
  children: React.ReactNode;
}

interface SneakerContext {
  sneakers: Sneaker[];
  error: string | null;
  isLoading: boolean;
  filters: { sortBy: string; searchQuerry: string };
  isCartOpen: boolean;
  cartItems: Sneaker[];
  totalPrice: number;
  isOrderCreating: boolean;
  addToFavorites: (item: Sneaker) => void;
  createOrder: () => void;
  addToCart: (item: Sneaker) => void;
  removeFromCart: (item: Sneaker) => void;
  onClickAddPlus: (item: Sneaker) => void;
  handleChangeSelect: (sortBy: string) => void;
  handleChangeSearchQuerry: (searchQuerry: string) => void;
  toggleCart: () => void;
}

export const SneakerContext = createContext<SneakerContext>({
  sneakers: [],
  error: null,
  isLoading: false,
  filters: { sortBy: "title", searchQuerry: "" },
  isCartOpen: false,
  cartItems: [],
  totalPrice: 0,
  isOrderCreating: false,
  addToFavorites: () => {},
  createOrder: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  onClickAddPlus: () => {},
  handleChangeSelect: () => {},
  handleChangeSearchQuerry: () => {},
  toggleCart: () => {},
});

export default function SneakerProvider({ children }: Props) {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({ sortBy: "title", searchQuerry: "" });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Sneaker[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrderCreating, setIsOrderCreating] = useState(false);

  const API_URL = "https://f67e77c455aa171b.mokky.dev";

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let URL;
      if (filters.searchQuerry) {
        URL = `${API_URL}/items?title=*${filters.searchQuerry}*&sortBy=${filters.sortBy}`;
      } else {
        URL = `${API_URL}/items?&sortBy=${filters.sortBy}`;
      }

      const data = await fetch(URL);
      const fetchedSneakers: Sneaker[] = await data.json();

      const updatedSneakers = fetchedSneakers.map((sneaker) => ({
        ...sneaker,
        parentId: null,
        isFavorite: false,
        isAdded: false,
      }));
      setSneakers(updatedSneakers);

      const favoritesData = await fetch(`${API_URL}/favorites`);
      const favorites: Sneaker[] = await favoritesData.json();

      const sneakersWithFavorites = updatedSneakers.map((sneaker) => {
        const favorite = favorites.find(
          (favorite) => favorite.parentId === sneaker.id
        );

        return !favorite
          ? sneaker
          : {
              ...sneaker,
              isFavorite: true,
              favoriteId: favorite.id,
            };
      });

      setSneakers(sneakersWithFavorites);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } else {
        setError("An unknown error occurred");
        console.error("Error fetching data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const addToFavorites = async (item: Sneaker) => {
    try {
      setSneakers((prevSneaker) =>
        prevSneaker.map((sneaker) => {
          return sneaker.id === item.id
            ? { ...sneaker, isFavorite: !sneaker.isFavorite }
            : sneaker;
        })
      );

      if (!item.isFavorite) {
        const obj = {
          parentId: item.id,
        };

        const response = await fetch(`${API_URL}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        const data = await response.json();

        setSneakers((prevSneakers) =>
          prevSneakers.map((sneaker) =>
            sneaker.id === item.id
              ? {
                  ...sneaker,
                  parentId: item.id,
                  favoriteId: data.id,
                }
              : sneaker
          )
        );
      } else {
        await fetch(`${API_URL}/favorites/${item.favoriteId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setSneakers((prevSneakers) =>
          prevSneakers.map((sneaker) => {
            return sneaker.id === item.parentId
              ? { ...sneaker, favoriteId: null }
              : sneaker;
          })
        );

        console.log(sneakers);
      }
    } catch {
      console.log("Error occured!"); // Handle errors
    }
  };

  const createOrder = async () => {
    try {
      setIsOrderCreating(true);

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          totalPrice: totalPrice,
        }),
      });

      setSneakers((prevSneakers) =>
        prevSneakers.map((sneaker) => ({ ...sneaker, isAdded: false }))
      );
      setCartItems([]);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsOrderCreating(false);
    }
  };

  const addToCart = (item: Sneaker) => {
    setSneakers((prevSneaker) =>
      prevSneaker.map((sneaker) => {
        return sneaker.id === item.id
          ? { ...sneaker, isAdded: !sneaker.isAdded }
          : sneaker;
      })
    );

    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { ...item, isAdded: true },
    ]);
  };

  const removeFromCart = (item: Sneaker) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const onClickAddPlus = (item: Sneaker) => {
    setSneakers((prevSneakers) =>
      prevSneakers.map((sneaker) =>
        sneaker.id === item.id
          ? { ...sneaker, isAdded: !sneaker.isAdded }
          : sneaker
      )
    );

    if (!item.isAdded) {
      addToCart(item);
    } else {
      removeFromCart(item);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setTotalPrice(cartItems.reduce((acc, item) => acc + +item.price, 0));
  }, [cartItems]);

  const handleChangeSelect = (sortBy: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, sortBy: sortBy }));
  };

  const handleChangeSearchQuerry = (searchQuerry: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuerry: searchQuerry,
    }));
  };

  const toggleCart = () => {
    setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
  };

  const ctxValue = {
    sneakers,
    error,
    isLoading,
    filters,
    isCartOpen,
    cartItems,
    totalPrice,
    isOrderCreating,
    addToFavorites,
    createOrder,
    addToCart,
    removeFromCart,
    onClickAddPlus,
    handleChangeSelect,
    handleChangeSearchQuerry,
    toggleCart,
  };

  return (
    <SneakerContext.Provider value={ctxValue}>
      {children}
    </SneakerContext.Provider>
  );
}
