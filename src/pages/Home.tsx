import { useContext } from "react";
import CardList from "../components/CardList";
import { SneakerContext } from "../store/SneakerContext";
import SearchIcon from "../assets/search.svg";

export default function Home() {
  const { filters, handleChangeSearchQuerry, handleChangeSelect } =
    useContext(SneakerContext);

  return (
    <>
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
      <CardList />
    </>
  );
}
