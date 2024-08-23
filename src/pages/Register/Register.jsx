import { useState } from 'react'
import axios from 'axios'
import '../../index.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import loginImg from "../../assets/images/login.png"
import { toast, ToastContainer } from 'react-toastify'
import Particlee from '../../component/Particles/Particles'


export default function Register() {
  let [isloading,setIsloading]=useState(false)
  let [errorMessage,setErrorMessage]=useState("")
    let [isFormActive, setIsFormActive] = useState(false); // & Add this state for controlling particles

  const navigate=useNavigate()
  const validationSchema=Yup.object({
    name:Yup.string().min(3,"Name lengh must be greater than or equal 3").max(20,"Name length must be less than or equal 20").required("name is required"),
    phone:Yup.string().matches(/^(002)?01[0125][0-9]{8}/,"enter a valid egyptian number").required("phone is required"),
    email:Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"enter a valid email").required("Email is required"),
    password:Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Minimum eight characters, at least one letter and one number").required("password is required"),
    rePassword:Yup.string().oneOf([Yup.ref('password')],"password and repassword not matched").required("re password is required"),
  })
  const formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": ""
    },
    onSubmit: register,
    validationSchema
  })

  function register() {
    setIsloading(true);
    setErrorMessage("")

    console.log(formik.values);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formik.values)
    .then((response)=>{
      toast.success('registered successfully"', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
      console.log(response.data.message);
      setIsloading(false);
      navigate("/login")
    })
    .catch((error)=>{
      console.log(error.response.data.message);
      setIsloading(false);
      setErrorMessage(error.response.data.message)
    })
    
  }
  const handleFocus = () => setIsFormActive(true);
  const handleBlur = () => setIsFormActive(false);
  return (
    <>
    {!isFormActive && <Particlee/>}
    <ToastContainer />
      <div className='my-10 customContainer '>
      <div className="grid grid-cols-12">
      <div className="md:col-span-5 col-start-2 col-span-10 md:col-start-1  shadow-2xl border p-5 ">
        <h1 className="text-2xl mb-7">Register Now :</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6 relative">
            <input onBlur={(e)=>{formik.handleBlur(e);handleBlur()}} onFocus={handleFocus} onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id="name" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
             placeholder="" />
            <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">name</label>
            {formik.errors.name && formik.touched.name && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.name}</p>}
          </div>
          <div className="mb-6 relative">
            <input onBlur={(e)=>{formik.handleBlur(e);handleBlur()}} onFocus={handleFocus} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" name='phone' className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=""  />
            <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone number</label>
            {formik.errors.phone && formik.touched.phone && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.phone}</p>}
          </div>
          <div className="mb-6 relative">
            <input onBlur={(e)=>{formik.handleBlur(e);handleBlur()}} onFocus={handleFocus} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" name='email' className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email address</label>
            {formik.errors.email && formik.touched.email && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.email}</p>}
          </div>
          <div className="mb-6 relative">
            <input onBlur={(e)=>{formik.handleBlur(e);handleBlur()}} onFocus={handleFocus} onChange={formik.handleChange} value={formik.values.password} type="password" id="password" name='password' className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
            <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
            {formik.errors.password && formik.touched.password && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.password}</p>}
          </div>
          <div className="mb-6 relative">
            <input onBlur={(e)=>{formik.handleBlur(e);handleBlur()}} onFocus={handleFocus} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id="confirm_password" name='rePassword' className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
            <label htmlFor="confirm_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Confirm password</label>
            {formik.errors.rePassword && formik.touched.rePassword && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.rePassword}</p>}
          </div>
          {errorMessage?<p className='bg-red-300  text-white p-1 rounded-md my-4 text-sm '>{errorMessage}</p>:null}
          <button type="submit" disabled={isloading} className="ms-auto block text-white bg-black border hover:bg-white hover:text-black focus:text-black  focus:bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{!isloading ? "register" : <i className='fas fa-spinner fa-spin mx-4'></i>} </button>
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
