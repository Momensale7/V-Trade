import loginImg from "../../assets/images/login.png";
import { useState } from 'react'
import axios from 'axios'
import '../../index.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function Shipping() {
    let { cartId } = useParams()
    let [isLoading, setIsLoading] = useState(false)
    const validationSchema = Yup.object({
        city: Yup.string().min(3, "Name lengh must be greater than or equal 3").max(20, "Name length must be less than or equal 20").required("name is required"),
        phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}/, "enter egyption phone number").required("phone is required"),
        details: Yup.string().min(3, "details lengh must be greater than or equal 3").max(100, "Name length must be less than or equal 50").required("details is required"),
    })
    const formik = useFormik({
        initialValues: {
            "details": "",
            "phone": "",
            "city": "",
        },
        onSubmit: payOnline,
        validationSchema
    })
    
    async function payOnline() {
        setIsLoading(true)
        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
            "shippingAddress": formik.values,
        }, {
            params: {
                url: "https://v-trade.vercel.app/allorders"
            },
            headers: {
                token: localStorage.getItem("token")
            }
        })
        console.log(res.data.session.url);
        setIsLoading(true)
        toast.success('Redirecting to pay', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        payCash()
        setIsLoading(false)
        open(res.data.session.url, "_self")

    }
    async function payCash() {
        try {
            let res = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/" + cartId, {
                "shippingAddress": formik.values,
            },  {
                headers: {
                    token: localStorage.getItem("token")
                }}
            )
            console.log(res);
        } catch (error) {
            console.log(error);
            
        }
      
        // toast.success('order confirmed', {
        //     position: "top-center",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        // });
        
    }
    return (
        <>
            <div className='my-10 customContainer'>
                <div className="grid grid-cols-12 ">
                    <div className="md:col-span-5 col-start-2 col-span-10 md:col-start-1 self-start shadow-2xl border p-5">
                        <h1 className="text-2xl mb-7">Shipping address</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-6 relative">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" id="city" name='city' className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-6 relative00 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
                                <label htmlFor="city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">city </label>
                                {formik.errors.city && formik.touched.city && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.city}</p>}
                            </div>
                            <div className="mb-6 relative">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" name='phone' className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
                                <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">phone </label>
                                {formik.errors.phone && formik.touched.phone && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.phone}</p>}
                            </div>
                            <div className="mb-6 relative">
                                <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} id="details" name='details' className="bg-gray-50 resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="details" />
                                {formik.errors.details && formik.touched.details && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.details}</p>}
                            </div>
                            <button type="submit" className="ms-auto block text-white bg-black border hover:bg-white hover:text-black focus:text-black focus:bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading ? <i className='fas fa-spinner fa-spin'></i> : "pay Now"}</button>
                            {/* <button type="button" onClick={()=>{payCash()}} className="ms-auto block text-white bg-black border hover:bg-white hover:text-black focus:text-black focus:bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading ? <i className='fas fa-spinner fa-spin'></i> : "pay Now"}</button> */}
                        </form>
                    </div>
                    <div className="col-span-7 text-right hidden md:block">
                        <img src={loginImg} alt="" className='h-[400px] block ms-auto' />
                    </div>
                </div>
            </div>

        </>
    )
}

