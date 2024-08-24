// import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';

import Home from './Pages/home';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
// import ProductDetails from './Pages/productDetails';
// import Favorites from './Pages/favorites';
import Products from './Pages/Products';



// import Home from "./Pages/home";
// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ProductDetails from "./Pages/productDetails";
import Favorites from "./Pages/favorites";
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
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { ThemeContext } from "./Context/ThemeContext";

function App() {
   // !theme
  const [theme,setTheme] = useState(localStorage.getItem('theme'));
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } ,[theme])

  const handlDarkMode = () =>{
    setTheme(theme === "dark"? 'light' : 'dark')
  }

  const dispatch = useDispatch();
  const checkToken = () => {
    if (localStorage.getItem("token") != null) {
      dispatch(changeAuth(true));
    }
  };
  checkToken();


  return (
    <>
      <BrowserRouter>
      <ThemeContext.Provider value={{theme,setTheme}}>
        <div className="dark:bg-gray-800">
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
                        <Route path='/products' element={<Products />}/>

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
          </div>
        </ThemeContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
