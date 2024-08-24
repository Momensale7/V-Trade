import axios from "axios";
import { toast } from "react-toastify";

export default async function addToCart(productId) {
    console.log("working")
        let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId:productId},{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        console.log(data);
        // setCartCount(data.numOfCartItems)
        toast.success('added to card successfully"', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  return data.numOfCartItems
}
