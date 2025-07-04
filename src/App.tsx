import CardList from "./components/CardList";
import Header from "./components/Header";
import SearchIcon from "./assets/search.svg";
import { useCallback, useEffect, useState } from "react";
import type { Sneakers } from "./models/sneakers.model";

const API_URL = "https://f67e77c455aa171b.mokky.dev";

function App() {
  const [sneakers, setSneakers] = useState<Sneakers[]>([]);
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
      const fetchedSneakers: Sneakers[] = await data.json();

      const updatedSneakers = fetchedSneakers.map((sneaker) => ({
        ...sneaker,
        isFavorite: false,
        isAdded: false,
      }));
      setSneakers(updatedSneakers);

      const favoritesData = await fetch(`${API_URL}/favorites`);
      const favorites: Sneakers[] = await favoritesData.json();

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

        <CardList sneakers={sneakers} />
      </div>
    </div>
  );
}

export default App;
