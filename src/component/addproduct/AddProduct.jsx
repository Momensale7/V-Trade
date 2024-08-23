import "./addProduct.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/Slicers/adminProducts";

// const initialProducts = [
//   {
//     id: 3,
//     title: "test three",
//     inStock: 30,
//     price: 495,
//     category: "men",
//   },
//   {
//     id: 4,
//     title: "test four",
//     inStock: 30,
//     price: 495,
//     category: "men",
//   },
// ];
function AddProduct() {
  // const [products, setProducts] = useState(initialProducts);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // const adminProducts = useSelector(
  //   (state) => state.adminProducts.adminProducts
  // );

  const adminCategory = useSelector(
    (state) => state.adminCategory.admincategory
  );
  function addImage(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  // const adminProducts = useSelector(
  //   (state) => state.adminProducts.adminProducts
  // );
  const dispatch = useDispatch();

  function addToAdminProducts(e) {
    e.preventDefault();
    if (!title || !price || !image || !category || !stock) return;
    const newItem = {
      id: crypto.randomUUID(),
      title,
      price,
      stock,
      category,
      image,
      desc,
    };

    dispatch(addProduct(newItem));
    setTitle("");
    setCategory("");
    setPrice(0);
    setStock(0);
  }
  return (
    <div className="add-product">
      <div className="add-container">
        <div className="add-info">
          <h2>Add Product</h2>
          <label>Product Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Product Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
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
          <label>Product Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <label>Product Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
        <div className="add-image">
          <label htmlFor="addimage">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </label>
          <input id="addimage" type="file" onChange={addImage} />
        </div>
        <button className="add-btn" onClick={addToAdminProducts}>
          Add The Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
