
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

import ProductDetails from "./Pages/productDetails";
import Favorites from "./Pages/favorites";
import Products from "./Pages/Products";
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import Home from './Pages/home';
import Cart from './Pages/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Dashboard from "./Pages/dashboard/Dashboard";
import Stats from "./component/stats/Stats";
import Setting from "./component/setting/Setting";
import Orders from "./component/orders/Orders";
import ProudctsAdmin from "./component/productsdash/ProudctsAdmin";
import AddProduct from "./component/addproduct/AddProduct";
import Shipping from "./Pages/Shipping/Shipping";
import Allorders from "./Pages/Allorders/Allorders";
import { useDispatch } from "react-redux";
import { changeAuth } from "./redux/Slicers/isLoggedIn";
import ResetCode from "./Pages/ResetCode/ResetCode";
import UpdatePasswoed from "./Pages/UpdatePasswoed/UpdatePasswoed";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

function App() {
  const dispatch =useDispatch()
  const checkToken =()=>{
    if(localStorage.getItem('token')!=null){
      dispatch(changeAuth(true))
    }
  }
  checkToken()
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="resetPass" element={<ResetPassword />} />
          <Route path="updatepass" element={<UpdatePasswoed />} />
          <Route path="restcode" element={<ResetCode />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:productID" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping/:cartId' element={<Shipping />} />
          <Route path='/allorders' element={<Allorders />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Stats />} />
            <Route path="stats" element={<Stats />} />
            <Route path="productsadmin" element={<ProudctsAdmin />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
