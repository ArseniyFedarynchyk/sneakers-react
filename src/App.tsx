import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import SneakerProvider from "./store/SneakerContext";
import RootLayout from "./layouts/RootLayout";
import SneakerDetailsPage, {
  loader as sneakerDetailsLoader,
} from "./pages/SneakerDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

export const API_URL = "https://f67e77c455aa171b.mokky.dev";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      {
        path: "sneakers/:sneakerId",
        element: <SneakerDetailsPage />,
        loader: sneakerDetailsLoader,
      },
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
