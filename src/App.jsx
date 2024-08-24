// import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';

// import Home from './Pages/home';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ProductDetails from './Pages/productDetails';
import Favorites from './Pages/favorites';
import Products from './Pages/Products';



import Home from "./Pages/home";
// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
// import ProductDetails from "./Pages/productDetails";
// import Favorites from "./Pages/favorites";
import Dashboard from "./Pages/dashboard/Dashboard";
import Stats from "./component/stats/Stats";
import Setting from "./component/setting/Setting";
import Orders from "./component/orders/Orders";
import ProudctsAdmin from "./component/productsdash/ProudctsAdmin";
import AddProduct from "./component/addproduct/AddProduct";

function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:productID" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Favorites />} />
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
      </BrowserRouter>
    </>
  );

}

export default App;
