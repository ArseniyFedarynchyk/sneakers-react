import { useContext } from "react";
import CardList from "../components/CardList";
import { SneakerContext } from "../store/SneakerContext";
import SearchIcon from "../assets/search.svg";

export default function Home() {
  const { sneakers, filters, handleChangeSearchQuerry, handleChangeSelect } =
    useContext(SneakerContext);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          All sneakers
        </h2>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
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

          <div className="relative w-full md:w-auto">
            <img className="absolute left-3 top-3" src={SearchIcon} alt="" />
            <input
              className="border border-gray-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Search..."
              value={filters.searchQuerry}
              onChange={(e) => handleChangeSearchQuerry(e.target.value)}
            />
          </div>
        </div>
      </div>
      <CardList items={sneakers} />
    </>
  );
}
