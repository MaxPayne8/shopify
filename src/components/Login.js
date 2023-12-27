import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { showCart, userData } from "../utils/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const passWord = useRef(null);
  const dispatch = useDispatch();
  dispatch(showCart(false));

  const userName = useRef(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const showToastMessageWrong = () => {
    toast.error("Wrong credentials!!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    const password = passWord.current?.value;

    const username = userName.current?.value;

    getData(password, username);
    setErr("");
  };

  const getData = async (password, username) => {
    const data = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await data.json();
    console.log(json);

    const { token, firstName, image } = json;

    if (json?.token) {
      localStorage.setItem("token", token);
      localStorage.setItem("firstname", firstName);
      localStorage.setItem("image", image);
    }

    dispatch(userData(firstName));
    dispatch(userData(image));

    json?.id
      ? navigate("/browse")
      : setErr("Kindly check your username/password ");
    showToastMessageWrong();
  };
  return (
    <div className="w-full relative ">
      <ToastContainer />
      <img
        className="h-screen w-full md:hidden "
        src="https://img.freepik.com/premium-photo/blue-wallpapers-that-will-make-your-desktop-look-dark-blue-wallpaper-blue-wallpaper-blue-wallpaper-wallpaper-backgrounds-iphone-wallpaper-wallpaper-backgrounds-wallpaper-backgrounds_635062-586.jpg"
        alt="movies-collage"
      ></img>

      <img
        className="h-0 w-0 md:w-full md:h-screen"
        src="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9naW58ZW58MHx8MHx8fDA%3D"
        alt="movies-collage"
      ></img>

      <form
        className="absolute  w-2/3  top-44 sm:top-32  right-0 left-0 m-auto sm:w-[500px]   bg-black  opacity-80 rounded-lg p-4 hover:cursor-pointer"
        onSubmit={handleClick}
      >
        <div className="flex flex-col  m-2">
          <label className="rounded-lg m-2  p-2 font-semibold text-white">
            Enter User Name{" "}
          </label>
          <input
            className="rounded-lg m-2 p-2 bg-gray-800 font-semibold text-white"
            placeholder="User Name"
            ref={userName}
          ></input>
          <label className="rounded-lg m-2  p-2 font-semibold text-white">
            Enter Password
          </label>

          <input
            className="rounded-lg m-2 p-2 bg-gray-800 font-semibold text-white"
            placeholder="Password"
            ref={passWord}
          ></input>
          <label className="text-red-700 m-2 font-semibold">{err}</label>

          <button className="mt-12 text-white bg-blue-800 rounded-lg p-2 text-lg  md:w-auto  md:ml-2  hover:bg-blue-600">
            {"Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
