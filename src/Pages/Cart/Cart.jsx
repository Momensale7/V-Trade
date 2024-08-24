import axios from "axios"
import { useEffect, useState } from "react";
import CartProduct from "../../Components/CartProduct/CartProduct";
import Loader from "../../Components/Loader/loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";





export default function Cart() {
  let [userCart, setUsearCart] = useState(undefined)
  let [isLoading, setIsLoading] = useState(true)


  async function getLoggedUserCard() {
    setIsLoading(true)
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      setUsearCart(data)
      console.log(data);
      setIsLoading(false)
    }
    catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  const fireRemoveToast=(productId)=>{
    toast.info(
      <div className='bg-slate '>
        <span>Are you sure you want to delete this item?</span>
        <button onClick={()=>{removeItemFromCart(productId),toast.dismiss();}} 
        className="ml-4 p-2 bg-red-500 text-white rounded">Delete</button>
        <button onClick={() => toast.dismiss()} className="ml-2 p-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>,
      {
        position: "top-right",
        autoClose: false,  // Keep the toast visible until manually closed
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      }
    );
  };
  const fireClearToast=()=>{
    toast.info(
      <div className='bg-slate '>
        <span>Are you sure you want to all items ?</span>
        <button onClick={()=>{clearCart(),toast.dismiss();}} 
        className="ml-4 p-2 bg-red-500 text-white rounded">Delete</button>
        <button onClick={() => toast.dismiss()} className="ml-2 p-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>,
      {
        position: "top-center",
        autoClose: false,  // Keep the toast visible until manually closed
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      }
    );
  };
  async function removeItemFromCart(productId) {
    setIsLoading(true)
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    setUsearCart(data)
    console.log(data);
    setIsLoading(false)
    // setCartCount(data.numOfCartItems)

  }
  async function clearCart() {
    setIsLoading(true)
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    setUsearCart(undefined)
    console.log(data);
    setIsLoading(false)
    // setCartCount(0)

  }
  async function updateProductCount(productId, productCount) {
    if (productCount == 0) {
      fireRemoveToast(productId)
    }
    else {
      let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, { count: productCount }, {

        headers: {
          token: localStorage.getItem("token")
        }
      })

      setUsearCart(data)
      // setCartCount(data.numOfCartItems)

    }


  }
  useEffect(() => {
    getLoggedUserCard()
  }, [])


  return (
    <div className="my-10 customContainer'">
      {isLoading && <Loader />}
      {!isLoading && <h1 className="text-center font-bold my-10 text-4xl">Your Cart</h1>}
      {!isLoading && (userCart == undefined || userCart?.numOfCartItems == 0) && <h1 className="text-center mt-10 font-bold h-screen"> No product in your cart</h1>}
      <div className="grid grid-cols-10 customContainer">
        <div className="col-span-10 md:col-span-6">
        {!isLoading && userCart?.data.products.length && <button onClick={fireClearToast} className="mb-3 block bg-red-800 text-white border-red-800 rounded border fw-semibold px-3 py-1">Clear cart</button>}

          {!isLoading && userCart?.data?.products?.map((product, index) => {
            return <CartProduct key={index} product={product}  fireRemoveToast={fireRemoveToast} userCart={userCart} updateProductCount={updateProductCount} />
          })
          }
        </div>
        {!isLoading && userCart?.data.products.length &&<div className="col-span-10 md:col-span-4 px-5 ">
        <div className="border px-5 ms-4 self-start pt-2 pb-4 ">
           <div>
            <h1 className=" md:text-xl text-center p-2 mt-3 lg:text-2xl font-bold">Order summery</h1>
            <div className='flex justify-between items-center mt-5'>
              <p className="font-light md: text-xs">Total Price :</p>
              <span className="text-black font-semibold ms-1">{userCart?.data.totalCartPrice}</span>
            </div>
            <div className='flex justify-between items-center mt-5'><p className="font-light md: text-xs">Total number of items</p>
              <span className="text-black font-semibold ms-1">{userCart?.numOfCartItems}</span>
              </div>
            <Link to={"/shipping/" + userCart.data._id} className="mt-5 block text-center bg-main text-white bg-black p-2 hover:bg-slate-300 hover:text-slate-900 hover:border  font-medium rounded-lg">go to Check Out</Link>
          </div>
        </div>
        </div>
          }
      </div>
    </div>)
}
