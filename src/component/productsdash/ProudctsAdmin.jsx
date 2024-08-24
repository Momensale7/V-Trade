import { useEffect, useState } from "react";
import "./productsadmin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCate, removeCate } from "../../redux/Slicers/adminCategorySlice";
import {
  removeProdcut,
  updateProdcut,
} from "../../redux/Slicers/adminProducts";
function ProudctsAdmin() {
  const [cate, setCate] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  // const [image, setImage] = useState("");

  const [seletedId, setsetSelectedId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  const adminProducts = useSelector(
    (state) => state.adminProducts.adminProducts
  );

  const adminCategory = useSelector(
    (state) => state.adminCategory.admincategory
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const pro = adminProducts.find((ele) => ele.id === seletedId);
  //   setUpdatedProduct(pro);
  //   // setTitle(pro?.title);
  //   // setDesc(pro?.desc);
  //   // setPrice(pro?.price);
  //   // setStock(pro?.stock);
  //   // setCategory(pro?.category);
  // }, [seletedId, updatedProduct]);

  function addToAdminCate() {
    if (!cate) return;
    const newItem = {
      id: crypto.randomUUID(),
      name: cate,
    };

    dispatch(addCate(newItem));
    setCate("");
  }

  // function adminUpdateProduct() {
  //   const newUpdate = {
  //     id: seletedId,
  //     title: title || updateProdcut.title,
  //     desc: desc || updateProdcut.desc,
  //     price: price || updateProdcut.price,
  //     category: category || updateProdcut.category,
  //     stock: stock || updateProdcut.stock,
  //   };
  //   dispatch(updateProdcut(newUpdate));
  //   setsetSelectedId(null);
  //   setCategory("");
  //   setTitle("");
  //   setPrice("");
  //   setPrice(0);
  //   setStock(0);
  // }
  function adminUpdateProduct() {
    const newUpdate = {
      id: seletedId,
      title: title || updatedProduct?.title,
      desc: desc || updatedProduct?.desc,
      price: price || updatedProduct?.price,
      category: category || updatedProduct?.category,
      stock: stock || updatedProduct?.stock,
    };

    dispatch(updateProdcut(newUpdate));

    // Reset form fields and selected product ID
    setsetSelectedId(null);
    setTitle("");
    setDesc("");
    setPrice(0);
    setStock(0);
    setCategory("");
  }
  useEffect(() => {
    if (seletedId) {
      const pro = adminProducts.find((ele) => ele.id === seletedId);
      setUpdatedProduct(pro);
      setTitle(pro?.title || "");
      setDesc(pro?.desc || "");
      setPrice(pro?.price || 0);
      setStock(pro?.stock || 0);
      setCategory(pro?.category || "");
    }
  }, [seletedId, adminProducts]);

  return (
    <div className="products-admin">
      {seletedId && (
        <div className="update-box">
          <div className="head">
            <h3>Update Product</h3>
            <button onClick={() => setsetSelectedId(null)}>
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="update-fileds">
            <label htmlFor="">Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor=""> Pproduct Description</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label htmlFor="">Procust Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="">Product Stock</label>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            {/* <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            /> */}
            <label>Product Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {adminCategory.map((ele) => (
                <option value={ele.name} key={ele.id}>
                  {ele.name}
                </option>
              ))}
            </select>
            <button className="update-btn" onClick={() => adminUpdateProduct()}>
              Update the product
            </button>
          </div>
        </div>
      )}

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
            <button onClick={() => setsetSelectedId(product.id)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
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
