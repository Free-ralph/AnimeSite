import "./App.css";
import AnimeNews from "./pages/News";
import Anime from "./pages/Anime";
import Layout from "./pages/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StateContextProvider } from "./context/StateContextProvider";
import ErrorPage from "./pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Anime />,
      },
      {
        path: "news",
        element: <AnimeNews />,
      },
    ],
  },
]);



function App() {
  return (
    <div className="overflow-x-hidden">
      <StateContextProvider>
      <RouterProvider router={router} />
      </StateContextProvider>
    </div>
  );
}

export default App;
