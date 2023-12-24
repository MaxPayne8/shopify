import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addAmount, addCartItems, showCart } from "../utils/slice";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";

const Browse = () => {
  function disableBackButton() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [prodData, setProdData] = useState(null);

  const [heroData, setHeroData] = useState(null); //OG list of products

  const [searchTxt, setSearchTxt] = useState("");

  const token = localStorage.getItem("token");
  const fName = localStorage.getItem("firstname");
  const image = localStorage.getItem("image");
  console.log(token);
  token ? <></> : navigate("/");

  const getAllProducts = async () => {
    const data = await fetch("https://dummyjson.com/products");
    const json = await data.json();

    setProdData(json.products);
    setHeroData(json.products);
    dispatch(showCart(true));
  };

  const handleClickAll = () => {
    setProdData(heroData);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getAllProducts();
    disableBackButton();
  }, []);

  const filterProducts = (e) => {
    const filterPrice = e.target.value;

    if (filterPrice === "all") {
      setProdData(heroData);
    } else if (filterPrice === "20") {
      setProdData(heroData?.filter((item) => item.price < 20));
    } else if (filterPrice === "50") {
      setProdData(
        heroData?.filter((item) => item.price >= 20 && item.price < 50)
      );
    } else if (filterPrice === "100") {
      setProdData(
        heroData?.filter((item) => item.price >= 50 && item.price < 100)
      );
    } else if (filterPrice === "200") {
      setProdData(
        heroData?.filter((item) => item.price >= 100 && item.price < 200)
      );
    } else if (filterPrice === "500") {
      setProdData(
        heroData?.filter((item) => item.price >= 200 && item.price < 500)
      );
    } else if (filterPrice === "1000") {
      setProdData(
        heroData?.filter((item) => item.price >= 500 && item.price < 1000)
      );
    } else if (filterPrice === "1500") {
      setProdData(
        heroData?.filter((item) => item.price >= 1000 && item.price < 1500)
      );
    } else if (filterPrice === "2000") {
      setProdData(
        heroData?.filter((item) => item.price >= 1500 && item.price < 2000)
      );
    }
  };

  return (
    <div className="bg-black">
      <div className="pt-4 mb-2 ml-3 mr-3 md:justify-between  md:flex-row flex items-center flex-col ">
        <form
          className=" flex   "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="m-2 ml-10  p-1 pl-2 border-2 h-10 w-60 sm:w-72 border-black rounded-lg"
            type="text"
            placeholder="Search Products,Brands,Categories..."
            onChange={(e) => {
              setSearchTxt(e.target.value);
            }}
            value={searchTxt}
          />
          <button
            className="m-2 ml-2 p-1 bg-blue-700 h-10  rounded-lg w-12 hover:bg-orange-500"
            onClick={() => {
              const searchedProd = prodData.filter(
                (item) =>
                  item.title.toLowerCase().includes(searchTxt.toLowerCase()) ||
                  item.brand.toLowerCase().includes(searchTxt.toLowerCase()) ||
                  item.category.toLowerCase().includes(searchTxt.toLowerCase())
              );
              searchedProd?.length
                ? setProdData(searchedProd)
                : setProdData(heroData);
              setSearchTxt("");
            }}
          >
            🔍
          </button>
        </form>
        <button
          className="m-2  p-1 bg-blue-700 h-10 w-40 rounded-lg  hover:bg-orange-500"
          onClick={() => handleClickAll()}
        >
          All Products
        </button>

        <select
          className="m-2 hover:cursor-pointer  font-semibold p-1 border-2 text-white bg-blue-700 w-56 border-black rounded-lg h-auto hover:bg-orange-500 "
          onChange={(e) => filterProducts(e)}
        >
          <option value="all"> Filter by Price</option>
          <option value="20"> Below Rs.20 </option>
          <option value="50"> Between Rs.20 - Rs.50</option>
          <option value="100"> Between Rs.50 Rs.100 </option>
          <option value="200"> Between Rs.100 Rs.200</option>
          <option value="500"> Between Rs.200 Rs.500</option>
          <option value="1000"> Between Rs.500 Rs.1000</option>
          <option value="1500"> Between Rs.1000 Rs.1500</option>
          <option value="2000"> Between Rs.1500 Rs.2000</option>
        </select>
        <button
          className="m-2  p-1 bg-blue-700 h-10 w-28 rounded-lg  hover:bg-orange-500"
          onClick={() => handleSignout()}
        >
          Log Out
        </button>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-white ml-4">Welcome, {fName}</h1>
        <img className="w-20 h-20" src={image} alt="user-profile" />
      </div>
      <div className="flex flex-wrap   justify-evenly">
        {!prodData?.length ? (
          <Spinner />
        ) : (
          prodData?.map((prod) => (
            <div className="relative">
              <ProductCard
                brand={prod.brand}
                category={prod.category}
                description={prod.description}
                discountPercentage={prod.discountPercentage}
                images={prod.images}
                price={prod.price}
                rating={prod.rating}
                stock={prod.stock}
                thumbnail={prod.thumbnail}
                title={prod.title}
              />
              <button
                className="absolute bottom-2 rounded-lg right-2 w-16 bg-blue-700 hover:h-8"
                onClick={() => {
                  dispatch(addCartItems(prod));
                  dispatch(addAmount(prod.price));
                }}
              >
                Add+
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Browse;
