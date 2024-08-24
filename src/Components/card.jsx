/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleCheck,
  faCircleExclamation,
  faHeart,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/Slicers/favoritesProductsSlice";
import { toast } from "react-toastify";
import addToCart from "../helpers/addToCart";
import goLogin from "../helpers/goLogin";

function Card({ title, image, price, id, rate, currentProduct, stock }) {
  const [isLoading, setIsloading] = useState(false);
  const favProducts = useSelector((state) => state.favorites.favoriteProducts);
  let isUserLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const dispatch = useDispatch();

  const isFavorite = favProducts.some((prod) => prod.id === currentProduct.id); //return true or false

  // Fire Toast
  const fireToast = (msg) => {
    toast.info(
      <div>
        {/* {isFavorite?
                    <FontAwesomeIcon icon={faCircleExclamation} className={`text-red-600 text-xl me-2`}/> :
                    <FontAwesomeIcon icon={faCircleCheck}  className={`text-green-600 text-xl me-2`}/>
                } */}
        <span className={isFavorite ? "text-red-600" : "text-green-600"}>
          {msg}
        </span>
      </div>,
      {
        position: "top-right",
        autoClose: true, // Keep the toast visible until manually closed
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      }
    );
  };
  const addTooCart = async (id) => {
    if (isUserLoggedIn) {
      setIsloading(true);
      await addToCart(id);
      setIsloading(false);
    } else {
      goLogin();
    }
  };

  const addRemoveFavorite = (isFavorite) => {
    if (isFavorite) {
      dispatch(addToFavorites(currentProduct));
      fireToast("Added To Favorites.");
    } else {
      dispatch(removeFromFavorites(currentProduct));
      fireToast("Removed From Favorites!");
    }
  };
  return (
    <>
      <div className="hover:scale-105 hover:drop-shadow-lg duration-300">
        <div className="bg-white drop-shadow-xl rounded-lg overflow-hidden h-80">
          <Link to={`/product/${id}`}>
            <img src={image} className=" w-full h-full cursor-pointer" />
          </Link>
        </div>
        <div className="p-3 relative">
          <Link to={`/product/${id}`}>
            <h2 className="font-bold text-lg cursor-pointer">{title}</h2>
          </Link>
          <div>
            {/* <FontAwesomeIcon
              icon={faStar}
              className="text-sm pl-1 text-yellow-300 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="text-sm pl-1 text-yellow-300 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="text-sm pl-1 text-yellow-300 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="text-sm pl-1 text-yellow-300 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faStarHalf}
              className="text-sm pl-1 text-yellow-300 cursor-pointer"
            /> */}
            {/* <span className="font-bold">{rate}/</span>
            <span>5</span> */}
            {stock && (
              <>
                <span className="font-bold">{stock}</span>
                <span> Stock</span>
              </>
            )}
          </div>
          <p className="font-bold text-lg">${price}</p>

          <button>
            {isLoading ? (
              <i className="fas fa-spin fa-spinner text-sky-400"></i>
            ) : (
              <FontAwesomeIcon
                onClick={() => {
                  addTooCart(id);
                }}
                icon={faCartShopping}
                className="text-sky-400 cursor-pointer text-xl hover:text-yellow-300 transition-all hover:scale-110 duration-300"
                title="Add To Cart"
              />
            )}
          </button>

          <FontAwesomeIcon
            icon={faHeart}
            className={`mx-4 hover:scale-125 duration-150 ${
              isFavorite === true ? "text-red-600" : "text-black"
            } text-2xl hover:text-red-600 cursor-pointer`}
            title={
              isFavorite === true ? "Remove From Favorites" : "Add To Favorites"
            }
            onClick={() => addRemoveFavorite(!isFavorite)}
          />
        </div>
      </div>
    </>
  );
}

export default Card;
