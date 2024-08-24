/* eslint-disable no-unused-vars */

import loginImg from "../../assets/images/login.png";

import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../index.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

export default function ResetCode() {
  let [isloading, setIsloading] = useState(false)
  let [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Email is required"),
  })
  const formik = useFormik({
    initialValues: {
      "resetCode": "",
    },
    onSubmit: ResetCode,
    validationSchema
  })
  function ResetCode() {
    setIsloading(true);
    setErrorMessage("")
    console.log(formik.values);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formik.values)
      .then((response) => {
        
        setIsloading(false);
        navigate("/updatepass")
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setIsloading(false);
        setErrorMessage(error.response.data.message)
      })

  }
 
  return (
    <>
      <div className='my-10 customContainer'>
      <div className="grid grid-cols-12 ">
      <div className="md:col-span-5 col-start-2 col-span-10 md:col-start-1 self-start shadow-2xl border p-5">
        <h1 className="text-2xl mb-7">Verify Code :</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6 relative">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" id="resetCode" name='resetCode' className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
            <label htmlFor="resetCode" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Reset Code :</label>
            {formik.errors.resetCode && formik.touched.resetCode && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.resetCode}</p>}
          </div>
          {errorMessage ? <p className='bg-red-300  text-white p-1 rounded-md my-4 text-sm '>{errorMessage}</p> : null}
          <button type="submit" disabled={isloading} className="ms-auto block text-white bg-black border hover:bg-white hover:text-black focus:text-black focus:bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{!isloading ? "Login" : <i className='fas fa-spinner fa-spin mx-4'></i>} </button>
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

