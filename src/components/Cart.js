import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addAmntIndex,
  addAmountIndex,
  addTotalItemsIndex,
  clearCart,
  removeAmount,
  removeItems,
} from "../utils/slice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.slice);
  const { amount } = useSelector((store) => store.slice);
  const { stock } = useSelector((store) => store.slice);
  const totalAmount = amount.reduce((e, acc) => e + acc, 0);
  const { totalItems } = useSelector((store) => store.slice);
  console.log(stock);

  const remove = (prod, index) => {
    dispatch(removeItems(index));
    dispatch(addAmntIndex(index));
    dispatch(removeAmount(prod.price));
  };

  const itemsArr = useSelector((store) => store.slice.totalItems);

  const handleAdd = (prod, index) => {
    if (totalItems[index] < stock[index]) {
      dispatch(addTotalItemsIndex(index));

      dispatch(addAmntIndex(index));
      dispatch(addAmountIndex(prod.price));
    } else {
      showToastMessage();
    }
  };

  const showToastMessage = () => {
    toast.error(" Max Limit Reached", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500,
      hideProgressBar: true,
    });
  };
  if (cartItems.length === 0)
    return (
      <div className="flex justify-center   mt-48 px-4">
        <Link to="/browse">
          <button className="   bg-slate-400 w-[300px] md:w-[400px]  rounded-lg border-2 border-black h-16 hover:bg-orange-500 font-semibold">
            Cart is Empty😥 , Add items now👻!!
          </button>
        </Link>
      </div>
    );
  return (
    <div className="bg-black">
      <ToastContainer />
      <div className="mx-auto text-center font-semibold rounded-lg   bg-slate-800 w-48 mt-6 p-4 text-slate-200">
        Total Amount : {totalAmount}
      </div>
      <div className="flex justify-center mt-6 px-4">
        <button
          className="   bg-slate-400 w-[300px] md:w-[400px]  rounded-lg border-2 border-black h-16 hover:bg-red-700 font-semibold"
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Clear Cart
        </button>
      </div>
      <div className="flex flex-wrap  bg-black   justify-evenly">
        {cartItems.map((prod, index) => (
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
              title={prod.title}
              key={prod.id}
            />

            <div className="flex">
              <button
                className="absolute bottom-1 rounded-lg right-2 w-10 bg-blue-700 hover:bg-blue-500"
                onClick={() => handleAdd(prod, index)}
              >
                ➕
              </button>
              <span className="absolute h-6  rounded-lg border-black border-2 bottom-1 left-[42%] text-center w-10 bg-blue-500 text-white ">
                {itemsArr[index]}
              </span>
              <button
                className="absolute bottom-1 rounded-lg  left-2 w-10 bg-red-700 hover:bg-red-500"
                onClick={() => remove(prod, index)}
              >
                ➖
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="px-3  flex justify-center  rounded-lg mx-auto  text-white bg-violet-700 font-semibold hover:bg-violet-900  mt-1"
      >
        TOP
      </button>
    </div>
  );
};

export default Cart;
