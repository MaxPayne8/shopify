import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addAmount,
  addCartItems,
  clearCart,
  removeAllAmount,
  removeAmount,
  removeCartItems,
} from "../utils/slice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.slice);
  const { amount } = useSelector((store) => store.slice);
  const totalAmount = amount.reduce((e, acc) => e + acc, 0);

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
    <div>
      <div className="mx-auto text-center font-semibold rounded-lg   bg-slate-800 w-48 mt-6 p-4 text-slate-200">
        Total Amount : {totalAmount}
      </div>
      <div className="flex justify-center mt-6 px-4">
        <button
          className="   bg-slate-400 w-[300px] md:w-[400px]  rounded-lg border-2 border-black h-16 hover:bg-red-700 font-semibold"
          onClick={() => {
            dispatch(clearCart());
            dispatch(removeAllAmount());
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
            <button
              className="absolute bottom-2 rounded-lg left-2 w-16 bg-red-700 hover:h-8"
              onClick={() => {
                dispatch(removeCartItems(index));
                dispatch(removeAmount(index));
              }}
            >
              Remove-
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
