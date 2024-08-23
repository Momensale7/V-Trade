import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">V-trade</div>
        <ul>
          <li>
            <NavLink to="stats">
              <i className="fa-solid fa-chart-simple"></i>
              <span>Stats</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="productsadmin">
              <i className="fa-solid fa-store"></i>
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="orders">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="setting">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="content">
        <nav>
          <h3>DashBoard</h3>
          <ul>
            <li>
              <i className="fa-solid fa-magnifying-glass"></i>
            </li>
            <li className="notification">
              <i className="fa-solid fa-bell"></i>
            </li>
            <li>
              <i className="fa-solid fa-user"></i>
            </li>
          </ul>
        </nav>
        <div className="dashboard-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
