// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/Slicers/getProductsSlice";
// import Loader from "../Components/Loader/loader";
import { useSelector } from "react-redux";
import Card from "../Components/card";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

//https://ecommerce.routemisr.com/api/v1/products?page=1&limit=5
function Home() {
  const adminProducts = useSelector(
    (state) => state.adminProducts.adminProducts
  );

  //   const dispatch = useDispatch();
  //   const { products, status, error } = useSelector((state) => state.products);
  //   const [page, setPage] = useState(1);
  //   const [limit, setLimit] = useState(3);

  //   const url_api = "https://ecommerce.routemisr.com/api/v1/products";

  //   useEffect(() => {
  //     dispatch(fetchProducts(`${url_api}?page=${page}&limit=${limit}`));
  //   }, [dispatch, limit, page]);

  //   let content;

  //   // Navigation
  //   const goToPrevPage = () => {
  //     if (page == 0) {
  //       setPage(0);
  //     } else {
  //       const newPage = page - 1;
  //       setPage(newPage);
  //     }
  //   };
  //   const goToNextPage = () => {
  //     const newPage = page + 1;
  //     setPage(newPage);
  //   };

  //   if (status === "loading") {
  //     content = <Loader />;
  //   } else if (status === "succeeded") {
  //     content = (
  //       <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-x-8 gap-y-8">
  //         {products.map((product) => (
  //           <Card
  //             key={product.id}
  //             image={product.images[1]
  //             title={product.title}
  //             price={product.price}
  //             id={product.id}
  //             rate={product.ratingsAverage}
  //             currentProduct={product}
  //           />
  //         ))}
  //       </div>
  //     );
  //   } else if (status === "failed") {
  //     content = <div>{error}</div>;
  //   }

  return (
    <>
      <section className='home d-flex justify-content-center'>
            <div className="customContainer h-screen">
            <div className="flex homeText justify-center items-start h-[100%] flex-col">
            <h1 className='text-[40px] text-white'>V-Trade</h1>
            <h2 className='text-2xl text-white'>20 % sale on friday </h2>
            <h2 className='text-2xl text-white'>Upgrade Your Wardrobe with Our New Collection!</h2>
            <Link to={'/register'} className="px-4 py-2 bg-black border hover:bg-slate-900 cursor-pointer  text-white rounded mt-5" >register Now</Link>
            </div>
            </div>
        </section>
      <div className="customContainer my-10">
        <h2 className="text-center font-bold my-10 text-4xl">Products</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-x-8 gap-y-8">
          {adminProducts.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              id={product.id}
              stock={product.stock}
              //   rate={product.ratingsAverage}
              currentProduct={product}
            />
          ))}
        </div>
      </div>
      {/* <div className="text-center my-5 text-3xl">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={`border-2 p-3 text-gray-500 border-gray-500 ${
            page == 0 ? "cursor-no-drop" : "cursor-pointer"
          } me-3 rounded-md hover:bg-slate-200 hover:scale-105 duration-75" title="Previous`}
          onClick={() => goToPrevPage()}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          className={`border-2 p-3 text-gray-500 border-gray-500 ${
            page == products.lengrh - 1 ? "cursor-no-drop" : "cursor-pointer"
          } ms-3 rounded-md hover:bg-slate-200 hover:scale-105 duration-75" title="Next`}
          onClick={() => goToNextPage()}
        />
      </div> */}
    </>
  );
}

export default Home;
