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
      <div className="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
        <Header />
        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
