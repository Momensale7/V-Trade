import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.svg"

export default  function goLogin() {
    toast.info(
        <div className='bg-slate text-center'>
            <div className="flex flex-shrink-0 items-center justify-center ms-10 lg:ms-0 ">
                <img
                    className="h-12 text-center "
                    src={logo}
                    alt="Your Company"
                />
                <span className="text-black font-bold text-2xl"> V-Trade</span>
            </div>
            <span className="block">need to login to perform this action</span>
            <Link to={'login'} onClick={() => { toast.dismiss(); }}
                className="ml-2 p-3 bg-black text-white rounded">Login</Link>
            <button onClick={() => toast.dismiss()} className="ml-2 p-2 bg-gray-500 text-white rounded">Cancel</button>
        </div>,
        {
            position: "top-center",
            autoClose: false,  
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
        }
    );
  return 
}