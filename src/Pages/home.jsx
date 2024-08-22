import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slicers/getProductsSlice";
import Loader from '../Components/Loader/loader';
import Card from "../Components/card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

//https://ecommerce.routemisr.com/api/v1/products?page=1&limit=5
function Home() {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);

    const url_api = "https://ecommerce.routemisr.com/api/v1/products";

    useEffect(() => {

        dispatch(fetchProducts(`${url_api}?page=${page}&limit=${limit}`));

    }, [dispatch,limit,page]);

    let content;

    // Navigation
    const goToPrevPage = () => {
        if (page == 0) {
            setPage(0);
        }else{
            const newPage = page - 1;
            setPage(newPage);
        }
        
    }
    const goToNextPage = () => {
        const newPage = page + 1;
        setPage(newPage);
    }


    if (status === 'loading') {
        content = <Loader />;
    } else if (status === 'succeeded') {
        content = (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-x-8 gap-y-8">
                {products.map((product) => (
                    <Card 
                        key={product.id}
                        image={product.images[1]}
                        title={product.title}
                        price={product.price}
                        id={product.id}
                        rate={product.ratingsAverage}
                        currentProduct={product}
                    />
                ))}
            </div>
        );
    } else if (status === 'failed') {
        content = <div>{error}</div>;
    }

    return (
        <>
            <div className="px-8 my-5">
                {content}
            </div>
            <div className="text-center my-5 text-3xl">
                <FontAwesomeIcon icon={faAngleLeft} className = {`border-2 p-3 text-gray-500 border-gray-500 ${page == 0? "cursor-no-drop" : "cursor-pointer"} me-3 rounded-md hover:bg-slate-200 hover:scale-105 duration-75" title="Previous`} onClick={() => goToPrevPage()}/>
                <FontAwesomeIcon icon={faAngleRight} className={`border-2 p-3 text-gray-500 border-gray-500 ${page == (products.lengrh - 1)? "cursor-no-drop" : "cursor-pointer"} ms-3 rounded-md hover:bg-slate-200 hover:scale-105 duration-75" title="Next`} onClick={() => goToNextPage()}/>
            </div>
        </>
    );
}

export default Home;
