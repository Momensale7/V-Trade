import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/loader";
import { List } from "flowbite-react";

function Orders() {
  const [orders,setOrders] = useState()
  const [isLoading,setIsLoading] = useState()
  const getOrders = async () => {
    try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders`)
        console.log(data);
        setOrders(data.data)
        setIsLoading(false)
    } catch (error) {
        console.log(error);
        setIsLoading(false)
        
    }
}
useEffect(()=>{
getOrders()
},[])
if(isLoading){
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
      <p className="truncate text-sm font-medium text-gray-900 dark:text-white"><span>user : </span>{order.user.email}</p>
    </div>
    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{order.totalOrderPrice} LE</div>
  </div>
</List.Item>
          
})}
</List>
  </div>
)
}

export default Orders;
