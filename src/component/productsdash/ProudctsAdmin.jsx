import { useState } from "react";
import "./productsadmin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCate, removeCate } from "../../redux/Slicers/adminCategorySlice";
import { removeProdcut } from "../../redux/Slicers/adminProducts";
function ProudctsAdmin() {
  const [cate, setCate] = useState("");

  const adminProducts = useSelector(
    (state) => state.adminProducts.adminProducts
  );

  const adminCategory = useSelector(
    (state) => state.adminCategory.admincategory
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function addToAdminCate() {
    if (!cate) return;
    const newItem = {
      id: crypto.randomUUID(),
      name: cate,
    };

    dispatch(addCate(newItem));
    setCate("");
  }
  return (
    <div className="products-admin">
      <h2>All Products</h2>
      <div className="all-products">
        <div className="product">
          <h3>Product title</h3>
          <p>Image</p>
          <p>inStock</p>
          <p>Price</p>
          <p>Category</p>
          <p></p>
        </div>
        {adminProducts.map((product) => (
          <div className="product" key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt="" />
            <p>{product.stock}</p>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <button onClick={() => dispatch(removeProdcut(product))}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        ))}
      </div>
      <button
        className="add-product-nav"
        onClick={() => navigate("/dashboard/add-product")}
      >
        Add New Product
      </button>
      <div className="all-category">
        <h2>All Categories</h2>
        {adminCategory.map((ele) => (
          <div className="cate" key={ele.id}>
            <p>{ele.name}</p>
            <button onClick={() => dispatch(removeCate(ele))}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        ))}
        <input
          placeholder="Enter new category"
          type="text"
          value={cate}
          onChange={(e) => setCate(e.target.value)}
        />
        <button onClick={addToAdminCate} className="add-product-nav">
          Add New Category
        </button>
      </div>
    </div>
  );
}

export default ProudctsAdmin;
