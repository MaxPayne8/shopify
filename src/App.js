import "./App.css";
import Login from "./components/Login";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Browse from "./components/Browse";
import { Provider } from "react-redux";
import Header from "./components/Header";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="bg-black w-full h-screen">
      <Provider store={appStore}>
        <Header />
        <Outlet />
      </Provider>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default App;
