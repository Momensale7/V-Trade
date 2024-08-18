import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slicers/getProductsSlice";
import Loader from '../Components/Loader/loader';
import Card from "../Components/card";
import { Link } from "react-router-dom";

//https://ecommerce.routemisr.com/api/v1/products?page=1&limit=5
function Home() {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    let content;


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
            <div className="container">
                {content}
            </div>
        </>
    );
}

export default Home;
