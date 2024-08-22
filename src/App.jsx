import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';



function App() {
  
  
    
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>





  
    {/* expamle of tilwind classes  */}
    {/* <p className='p-8 text-red-500 text-center fa-2xl
                  hover:text-blue-900 dark:text-white dark:bg-slate-950'
    >يلا يا رجالة</p> */}
    {/* example of toast */}
    {/* <button onClick={()=>{fireToast()}} 
    className='block m-auto bg-blue-500 text-white p-3 rounded-md drop-shadow-md border'
      >fireToast</button>

    <ToastContainer />
    */}</> 
  )
}

export default App
