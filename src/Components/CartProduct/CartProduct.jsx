/* eslint-disable react/prop-types */
import { useState } from "react"

export default function CartProduct({product,updateProductCount ,fireRemoveToast}) {
    let [count,setCount]=useState(product.count)
  return (
    <>
      <div className=" p-4">
        <div className="grid grid-cols-12  border-b border-slate-500 py-3">
        <div className="col-span-12 sm:col-span-1 text-center">
          <img src={product.product.imageCover} alt="" />
        </div>
        <div className=" col-span-8 sm:col-span-8  sm:ps-7 text-lg">
        <p className=" font-semibold mb-2">{product.product.title}</p>
        <p className=" font-light mb-2">{product.product.category.name}</p>
        <p className="font-semibold mb-2">{product.price} EGB</p>
        </div>
        <div className="  col-span-4 sm:col-span-3 mb-3 px-3  ">
        <button onClick={()=>(fireRemoveToast(product.product._id))} className=" block ms-auto text-center mb-2 text-red-600 font-semibold cursor-pointer  hover:text-red-800 rounded transition-all "> <li className="fa fa-trash me-1"></li></button>
          <span className="rounded ms-auto border flex justify-between items-center py-1 px-2 rounded-md bg-slate-200">
          <button onClick={()=>{updateProductCount(product.product._id,product.count -1),product.count>1?setCount(product.count-1):null}} className="text-center mx-2 text-3xl">-</button>
          <p className="text-center ">{count}</p>
          <button  onClick={()=>{setCount(product.count+1),updateProductCount(product.product._id,product.count +1)}} className="text-center mx-2 text-3xl">+</button>
          </span>
        </div>
      </div>
    </div> 
    </>
  )
} 
