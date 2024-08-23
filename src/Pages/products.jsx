import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slicers/getProductsSlice";
import Loader from "../Components/Loader/loader";
import Card from "../Components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Products(){
    const [categoris,setCategoris] = useState([]);
    const [categoryID,setCategoryID] = useState('');
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    const url_api = "https://ecommerce.routemisr.com/api/v1/products";
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [price,setPrice] = useState(0)
    let content;

    useEffect(() => {
        let apiUrl = `${url_api}?page=${page}&limit=${limit}`;
        if (categoryID) {
            apiUrl += `&category=${categoryID}`
        }
        dispatch(fetchProducts(apiUrl));
    }, [dispatch,limit,page,categoryID]);

    useEffect(() => {
        axios("https://ecommerce.routemisr.com/api/v1/categories")
        .then((res) => {
            // console.log(res.data.data)
            setCategoris(res.data.data)
        })
        .catch((err) => console.log(err))
    } ,[])

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

    const filterByCategory = (catID) =>{
        setCategoryID(catID);
        setPage(1)
    }

    const getPrice = (ev) =>{
        setPrice(ev.target.value)
    }

    if (status === 'loading') {
        content = <Loader />;
    } else if (status === 'succeeded') {
        content = (
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-x-8 gap-y-8">
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


    return(
        <div className="flex flex-col md:flex-row gap-4">
            {/* Filtration */}
            <div className="basis-[25%] border-2 rounded-xl p-3 h-fit">
                <div>
                    <h1 className="font-bold py-2">Filters</h1>
                </div>
                <hr />
                <div>

                    {categoris.length > 0 && categoris.map((cat) => (
                        <p key={cat._id} className="text-xs text-slate-500 py-2 cursor-pointer hover:scale-105 hover:text-blue-700 hover:font-bold duration-150" onClick={() => filterByCategory(cat._id)}>{cat.name}</p>
                    ))}
                </div>
                <hr />
                <div className="my-2">
                    <h1 className="font-bold py-2">Price</h1>
                    <span className="text-orange-600">${price}</span>
                    <input 
                        type="range" 
                        min={0} 
                        max={20000} 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        onChange={(e) => getPrice(e)}
                    />
                </div>
                <hr />
                <div>
                    <h1 className="font-bold py-2">Colors</h1>
                </div>
                <div className="flex flex-row flex-wrap gap-3 my-3">
                    {["bg-green-600", "bg-red-600", "bg-yellow-600", "bg-blue-600", "bg-orange-600", "bg-pink-600", "bg-white", "bg-black", "bg-sky-500"].map((color,index) => (
                        <p key={index} className={`${color} w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 duration-150`}></p>
                    ))}
                </div>
                <hr />
                <div>
                    <h1 className="font-bold py-2">Size</h1>
                </div>
                <div>
                    {['Small','Medium','Larg','X-Larg','XX-Larg'].map((size,index) => (
                        <button key={index}  className="rounded-3xl bg-gray-300 px-3 py-2 my-2 text-gray-500 hover:bg-black duration-300 mx-2">{size}</button>
                    ))}
                </div>
                <hr />
                <div>
                    <h1 className="font-bold py-2">Dress Style</h1>
                </div>
                <div>
                    {['Casual','Formal','Larg','Party','Gym'].map((style,index) => (
                        <p key={index} className="text-xs text-slate-500 py-2 cursor-pointer hover:scale-105 hover:text-blue-700 hover:font-bold duration-150">{style}</p>
                    ))}
                </div>
            </div>


            {/* Products */}
            <div className="basis-[75%]">
                {content}
                <div className="text-center my-5 text-3xl">
                    <FontAwesomeIcon icon={faAngleLeft} className = {`border-2 px-3 py-2 text-gray-500 border-gray-500 ${page == 0? "cursor-no-drop" : "cursor-pointer"} me-3 rounded-md hover:bg-slate-200 hover:scale-105 duration-75" title="Previous`} onClick={() => goToPrevPage()}/>
                    <FontAwesomeIcon icon={faAngleRight} className={`border-2 px-3 py-2 text-gray-500 border-gray-500 ${page == (products.lengrh - 1)? "cursor-no-drop" : "cursor-pointer"} ms-3 rounded-md hover:bg-slate-200 hover:scale-105 duration-75" title="Next`} onClick={() => goToNextPage()}/>
                </div>
            </div>
        </div>
    )
}

export default Products;