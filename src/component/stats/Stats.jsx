import { useEffect, useState } from "react";

function Stats() {
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    async function getTopSelling() {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      const data = await res.json();
      setTopSelling(data.data.slice(13, 20));
    }
    getTopSelling();
  }, []);

  return (
    <div className="stats">
      <h2>Statistics</h2>
      <div className="stats-box">
        <div className="box">
          <i className="fa-regular fa-rectangle-list"></i>
          <h3>1600</h3>
          <p>Total Orders</p>
        </div>
        <div className="box">
          <i className="green-color fa-solid fa-spinner"></i>
          <h3>1600</h3>
          <p>Pending</p>
        </div>
        <div className="box">
          <i className="blue-color fa-regular fa-circle-check"></i>
          <h3>1600</h3>
          <p>Completed</p>
        </div>
        <div className="box">
          <i className="orange-color fa-solid fa-sack-dollar"></i>
          <h3>$1600</h3>
          <p>Profits</p>
        </div>
      </div>
      <div className="stats-categories">
        <div className="top-selling">
          <h3>Top Selling Items</h3>
          <ul>
            <li>
              <p>Item</p>
              <p>Sold</p>
            </li>
            {topSelling.map((ele) => (
              <li key={ele.id}>
                <div className="left">
                  <img src={ele.images[0]} alt="" />
                  <div className="info">
                    <p>{ele.title}</p>
                    <p>{ele.price}</p>
                  </div>
                </div>

                <p>{ele.sold}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="categories">
          <h3>All Categories</h3>
          <ul>
            <li>
              <p>Category Name</p>
              <span>Products Count</span>
            </li>
            <li>
              <p>Women&apos;s Fashion</p>
              <span>145</span>
            </li>
            <li>
              <p>Men&apos;s Fashion</p>
              <span>95</span>
            </li>
            <li>
              <p>Electronics</p>
              <span>45</span>
            </li>
            <li>
              <p>Health & Beauty</p>
              <span>86</span>
            </li>
            <li>
              <p>Mobile Phones & Accessories</p>
              <span>231</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Stats;
