import { faMinus, faPlus, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader/loader";
import addToCart from "../helpers/addToCart";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import goLogin from "../helpers/goLogin";

function ProductDetails(){
    const params = useParams();
    const [product, setProduct] = useState({});
    const [productsNumber ,setProductsNumber] = useState(0)
    const [isLoading,setIsloading] = useState(false)
    let isUserLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn)
    useEffect(() => {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${params.productID}`)
        .then((res) => setProduct(res.data.data))
        .catch((err) => console.log(err))
    } ,[params.productID])

    const addTooCart = async (id) => {
        if (isUserLoggedIn) {
            setIsloading(true)
            await addToCart(id)
            setIsloading(false)
        }
        else {
            goLogin()
        }

    }
    const increamentProducts = () => {
        setProductsNumber(productsNumber + 1)
    }

    const decreamentProducts = () => {
        if (productsNumber < 1) {
            setProductsNumber(0)
        }else{
            setProductsNumber(productsNumber - 1)
        }
        
    }

    return(
        <>
        <ToastContainer />
            {product == {} ? <Loader/> :
            <div className="flex md:flex-row flex-col gap-8 customContainer my-10">
            <div className="basis-[15%] flex xs:flex-row  md:flex-col gap-5">
                {product.images?.slice(0, 3).map((img, index) => (
                    <img key={index} src={img} alt="" className="rounded-2xl border-2 drop-shadow-xl h-[11rem] w-full mb-3 hover:border-gray-500 cursor-pointer"/>
                ))}
            </div>
            <div className="basis-[35%]">
                <img src={product.imageCover} alt="" className="rounded-2xl border-2 h-[34rem] drop-shadow-xl w-full hover:border-gray-500 cursor-pointer"/>
            </div>
            <div className="basis-[50%] flex flex-col gap-y-7">
                <h1 className="font-black text-4xl">{product.title}</h1>
                <div>
                    <FontAwesomeIcon icon={faStar} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                    <FontAwesomeIcon icon={faStar} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                    <FontAwesomeIcon icon={faStar} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                    <FontAwesomeIcon icon={faStar} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                    <FontAwesomeIcon icon={faStarHalf} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                    <span className="font-bold">{product.ratingsAverage}/</span><span>5</span>
                </div>
                <h1 className="font-bold text-2xl">${product.price}</h1>
                <p className="text-slate-400">{product.description}</p>
                <hr />
                <div>
                    <h3 className="text-slate-400 mb-2">Chose Size:</h3>
                    {['Small','Medium','Larg','X-Larg'].map((size,index) => (
                        <button key={index}  className="rounded-3xl bg-gray-300 px-3 py-2 text-gray-500 hover:bg-black mx-2">{size}</button>
                    ))}
                </div>
                <hr />
                <div className="flex flex-row gap-3">
                    <div className="bg-gray-300 rounded-2xl px-3 basis-1/3 flex justify-between items-center">
                        <FontAwesomeIcon icon={faMinus} className="cursor-pointer" onClick={() => decreamentProducts()}/>
                        <span>{productsNumber}</span>
                        <FontAwesomeIcon icon={faPlus} className="cursor-pointer" onClick={() => increamentProducts()}/>
                    </div>
                    <div className="basis-2/3">
                        <button disabled={isLoading?true:false} className="bg-black px-10 py-2 w-full rounded-3xl text-white hover:bg-yellow-300 hover:text-zinc-950" onClick={()=>{addTooCart(params.productID)}}>{!isLoading ? "Add to cart" : <i className='fas fa-spinner fa-spin mx-4'></i>}</button>
                    </div>
                </div>
            </div>
        </div>}
        </>
    )
}

export default ProductDetails;