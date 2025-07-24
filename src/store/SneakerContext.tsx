import { createContext, useState, useCallback, useEffect } from "react";
import type { Sneaker } from "../models/sneaker.model";
import { API_URL } from "../App";

interface Props {
  children: React.ReactNode;
}

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
  createOrder: () => void;
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

export default function SneakerProvider({ children }: Props) {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [favorites, setFavorites] = useState<Sneaker[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({ sortBy: "title", searchQuerry: "" });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Sneaker[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrderCreating, setIsOrderCreating] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

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

      const storedCartItems = localStorage.getItem("cartItems");
      const cartItems: Sneaker[] = storedCartItems
        ? JSON.parse(storedCartItems)
        : [];

      const storedFavorites = localStorage.getItem("favorites");
      const favorites: Sneaker[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      const updatedSneakers = fetchedSneakers.map((sneaker) => {
        const isAdded = cartItems.some(
          (cartItem) => cartItem.id === sneaker.id
        );
        const isFavorite = favorites.some(
          (favorite) => favorite.id === sneaker.id
        );
        return {
          ...sneaker,
          parentId: null,
          isFavorite: isFavorite,
          isAdded: isAdded,
        };
      });

      setSneakers(updatedSneakers);
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

  const addToFavorites = (item: Sneaker) => {
    setSneakers((prevSneaker) =>
      prevSneaker.map((sneaker) => {
        return sneaker.id === item.id
          ? { ...sneaker, isFavorite: !sneaker.isFavorite }
          : sneaker;
      })
    );

    if (!item.isFavorite) {
      setFavorites((prevFavorites) => {
        const newFavorites = [...prevFavorites, { ...item, isFavorite: true }];
        updateFavoritesLocalStorage(newFavorites);
        return newFavorites;
      });
    } else {
      setFavorites((prevFavorites) => {
        const newFavorites = prevFavorites.filter(
          (favorite) => favorite.id !== item.id
        );
        updateFavoritesLocalStorage(newFavorites);
        return newFavorites;
      });
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

      setOrderId(data.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOrderCreating(false);
    }
  };

  const updateLocalStorage = (cartItems: Sneaker[]) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const updateFavoritesLocalStorage = (favorites: Sneaker[]) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeFromCart = (item: Sneaker) => {
    setCartItems((prevCartItems) => {
      const newCartItems = prevCartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      updateLocalStorage(newCartItems);
      return newCartItems;
    });

    setSneakers((prevSneakers) =>
      prevSneakers.map((sneaker) =>
        sneaker.id === item.id ? { ...sneaker, isAdded: false } : sneaker
      )
    );

    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.map((favorite) =>
        favorite.id === item.id ? { ...favorite, isAdded: false } : favorite
      );
      updateFavoritesLocalStorage(newFavorites);
      return newFavorites;
    });
  };

  const onClickAddPlus = async (item: Sneaker) => {
    setSneakers((prevSneakers) => {
      const sneakerToUpdate = prevSneakers.find(
        (sneaker) => sneaker.id === item.id
      );

      if (sneakerToUpdate) {
        const isCurrentlyAdded = sneakerToUpdate.isAdded;

        const updatedSneakers = prevSneakers.map((sneaker) =>
          sneaker.id === item.id
            ? { ...sneaker, isAdded: !isCurrentlyAdded }
            : sneaker
        );

        setFavorites((prevFavorites) => {
          const newFavorites = prevFavorites.map((favorite) =>
            favorite.id === item.id
              ? { ...favorite, isAdded: !isCurrentlyAdded }
              : favorite
          );
          updateFavoritesLocalStorage(newFavorites);
          return newFavorites;
        });

        setCartItems((prevCartItems) => {
          let newCartItems;

          if (!isCurrentlyAdded) {
            if (!prevCartItems.some((cartItem) => cartItem.id === item.id)) {
              newCartItems = [...prevCartItems, { ...item, isAdded: true }];
            } else {
              newCartItems = prevCartItems;
            }
          } else {
            newCartItems = prevCartItems.filter(
              (cartItem) => cartItem.id !== item.id
            );
          }
          updateLocalStorage(newCartItems);
          return newCartItems;
        });

        return updatedSneakers;
      }

      return prevSneakers;
    });
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    const storedFavorites = localStorage.getItem("favorites");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setTotalPrice(cartItems.reduce((acc, item) => acc + +item.price, 0));
  }, [cartItems]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

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
    setOrderId(null);
  };

  const ctxValue = {
    sneakers,
    favorites,
    error,
    isLoading,
    filters,
    isCartOpen,
    cartItems,
    totalPrice,
    isOrderCreating,
    orderId,
    addToFavorites,
    createOrder,
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
