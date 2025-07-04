import CardList from "./components/CardList";
import Header from "./components/Header";
import SearchIcon from "./assets/search.svg";

function App() {
  return (
    <div className="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <Header />
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">All sneakers</h2>

          <div className="flex gap-3">
            <select
              className="py-2 px-3 border border-gray-200 rounded outline-none"
              name=""
              id=""
            >
              <option value="">By price (low - high)</option>
              <option value="">By price (high - low)</option>
              <option value="">By name</option>
            </select>
            <div className="relative">
              <img className="absolute left-3 top-3" src={SearchIcon} alt="" />
              <input
                className="border border-gray-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        <CardList />
      </div>
    </div>
  );
}

export default App;
