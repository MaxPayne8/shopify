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
    <div className=" flex flex-col relative text-left w-[300px] my-4 sm:w-[300px] h-[410px] font-semibold  shadow-md shadow-slate-300 hover:shadow-xl hover:shadow-blue-600 bg-black text-slate-200 m-2 p-2 rounded-lg hover:cursor-pointer">
      <h1 className="text-lg">
        {brand}-{title} ({category})
      </h1>
      <p className="py-1 text-slate-700">{newDescription}...</p>

      <div className="flex justify-between">
        <h1 className="p-1">{rating}⭐</h1>
        <h1 className="p-1">{stock} in Stock</h1>
      </div>

      <div className="relative">
        <div className="  overflow-hidden ">
          <div
            className={`flex w-[300px] transition ease-out duration-400`}
            style={{
              transform: `translateX(-${imgId * 100}%)`,
            }}
          >
            {reducedImgs.map((img, index) => (
              <img
                key={index}
                className="rounded-lg  min-w-[300px] h-56"
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
      <div className="flex">
        <h1 className="p-1 ">Rs.{price}</h1>
        <h1 className="p-1 ">({discountPercentage}%Off)</h1>
      </div>
    </div>
  );
};

export default ProductCard;
