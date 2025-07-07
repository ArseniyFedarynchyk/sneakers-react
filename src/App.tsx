import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import SneakerProvider from "./store/SneakerContext";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

function App() {
  return (
    <SneakerProvider>
      <RouterProvider router={router} />
    </SneakerProvider>
  );
}

export default App;
