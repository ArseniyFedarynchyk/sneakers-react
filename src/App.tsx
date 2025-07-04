import CardList from "./components/CardList";
import Header from "./components/Header";
import SearchIcon from "./assets/search.svg";
import { useCallback, useEffect, useState } from "react";
import type { Sneaker } from "./models/sneaker.model";

const API_URL = "https://f67e77c455aa171b.mokky.dev";

function App() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({ sortBy: "title", searchQuerry: "" });

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangeSelect = (sortBy: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, sortBy: sortBy }));
  };

  const handleChangeSearchQuerry = (searchQuerry: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuerry: searchQuerry,
    }));
  };

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

  return (
    <div className="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <Header />
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">All sneakers</h2>

          <div className="flex gap-3">
            <select
              className="py-2 px-3 border border-gray-200 rounded outline-none"
              name="sort"
              defaultValue="title"
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              <option value="title">By name</option>
              <option value="price">By price (low - high)</option>
              <option value="-price">By price (high - low)</option>
            </select>

            <div className="relative">
              <img className="absolute left-3 top-3" src={SearchIcon} alt="" />
              <input
                className="border border-gray-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                type="text"
                placeholder="Search..."
                value={filters.searchQuerry}
                onChange={(e) => handleChangeSearchQuerry(e.target.value)}
              />
            </div>
          </div>
        </div>
        <CardList sneakers={sneakers} addToFavorites={addToFavorites} />
      </div>
    </div>
  );
}

export default App;
