import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import SneakerDetailsPage from "./pages/SneakerDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import CheckoutPage from "./pages/CheckoutPage";
import SneakerProvider from "./store/SneakerProvider";
import ErrorPage from "./pages/ErrorPage";
import { sneakerDetailsLoader } from "./loaders";

export const API_URL = "https://f67e77c455aa171b.mokky.dev";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      {
        path: "sneakers/:sneakerId",
        errorElement: <ErrorPage />,
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
