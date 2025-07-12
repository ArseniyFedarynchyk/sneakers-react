import { useContext } from "react";
import Header from "../components/Header";
import { SneakerContext } from "../store/SneakerContext";
import Drawer from "../components/Drawer";
import { Outlet } from "react-router";

export default function RootLayout() {
  const { isCartOpen } = useContext(SneakerContext);

  return (
    <>
      {isCartOpen && <Drawer />}
      <div className="bg-white md:w-4/5 md:m-auto md:rounded-xl md:shadow-xl md:mt-14">
        <Header />
        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
