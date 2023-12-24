import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { cartItems } = useSelector((store) => store.slice);
  const token = localStorage.getItem("token");

  return (
    <div className="flex bg-slate-900 text-slate-200  w-full items-center justify-between h-14">
      <img
        src="https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png"
        alt="logo"
        className="ml-4 w-10 h-10 "
      />
      <Link to="/browse">
        <h1 className="mr-4 hover:text-xl">Browse</h1>
      </Link>
      {token && (
        <Link to="/cart">
          <h1 className="mr-4 hover:text-xl">Cart ({cartItems?.length})</h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
