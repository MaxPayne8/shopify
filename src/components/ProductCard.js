import React, { useState } from "react";

const ProductCard = ({
  brand,
  category,
  description,
  discountPercentage,
  images,
  price,
  rating,
  stock,

  title,
}) => {
  const reducedImgs = images.slice(0, 3);
  let [imgId, setImgId] = useState(0);
  const newDescription = description.substring(0, 40);
  return (
    <div className=" flex flex-col relative text-left w-[350px] my-4 sm:w-96 h-[460px] font-semibold  shadow-md shadow-slate-300 hover:shadow-xl hover:shadow-blue-600 bg-black text-slate-200 m-2 p-2 rounded-lg hover:cursor-pointer">
      <h1 className="text-2xl">
        {brand}-{title} ({category})
      </h1>
      <p className="py-1 text-slate-700">{newDescription}...</p>

      <div className="flex justify-between">
        <h1 className="p-1">{rating}⭐</h1>
        <h1 className="p-1">{stock} in Stock</h1>
      </div>

      <div className="relative">
        {/* {
          <img
            className="rounded-lg w-96 h-56"
            src={images[imgId]}
            alt="prod-img"
          />
        } */}
        <div className="  overflow-hidden ">
          <div
            className={`flex w-96 transition ease-out duration-400`}
            style={{
              transform: `translateX(-${imgId * 100}%)`,
            }}
          >
            {reducedImgs.map((img, index) => (
              <img
                key={index}
                className="rounded-lg  min-w-96 h-56"
                src={img}
                alt="prod-img"
              />
            ))}
          </div>
        </div>

        {images.length > 1 ? (
          <div>
            {" "}
            <button
              className="absolute top-20 right-0 w-16 bg-gradient-to-r from-black hover:from-blue-700 "
              onClick={() => (imgId < 2 ? setImgId(imgId + 1) : setImgId(0))}
            >
              ➡
            </button>
            <button
              className="absolute top-20 left-0 w-16 bg-gradient-to-r from-black hover:from-blue-700"
              onClick={() => (imgId === 0 ? setImgId(2) : setImgId(imgId - 1))}
            >
              ⬅
            </button>
          </div>
        ) : null}
      </div>
      <h1 className="p-1 ">Rs.{price}</h1>
      <h1 className="p-1 ">Discount-{discountPercentage}%</h1>
    </div>
  );
};

export default ProductCard;
