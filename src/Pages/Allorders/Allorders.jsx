import axios from "axios"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { List } from "flowbite-react";
import Loader from "../../Components/Loader/loader";

export default function Allorders() {
    let [isLoading, setIsLoading] = useState(true)
    let [orders, setOrders] = useState([])
    const[userOrderErr,setUserOrderErr]=useState(false)
    
    const getOrders = async () => {
        let user = jwtDecode(localStorage.getItem('token'))
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${user.id}`)
            console.log(user.id);
            console.log(data);
            setOrders(data)
            setIsLoading(false)
            setUserOrderErr(false)
        } catch (error) {
            console.log(error);
            setUserOrderErr(true)
            setIsLoading(false)
            getOrders()
        }
    }
    useEffect(()=>{
        console.log('hello')
        getOrders()
    },[])
    if(isLoading ||userOrderErr){
        return <Loader/>
    }
    return (
        <div className="mt-10 customContainer">
    <List unstyled className="px-4 pt-3  divide-y divide-gray-200 dark:divide-gray-700">
    <h2 className='text-[20px] font-medium text-center text-2xl mb-3  '>My Orders</h2>
      {orders?.map((order)=>{
        return  <List.Item key={order._id} className="p-2 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-gray-500 dark:text-gray-400"><span>Date :</span> {order.createdAt.split('T').join(' ').split(/\.[0-9A-Za-z]{0,}/)}</p>
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white"><span>Payment : </span>cash</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{order.totalOrderPrice} LE</div>
        </div>
      </List.Item>
                
      })}
    </List>
        </div>
    )
}
