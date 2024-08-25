// import { Fragment } from 'react'
import logo from "../../assets/images/logo.svg";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { changeAuth } from "../../redux/Slicers/isLoggedIn";

import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import LangDrop from "../LangDrop/LangDrop";
import { changeAmdinAuth } from "../../redux/Slicers/isAdmim";




export default function Navbar() {
  const myLang = useSelector((state) => state.langSlicer.language);
  const translation = useSelector((state) => state.langSlicer.translation)
  const iSAdmin = useSelector((state) => state.isAdmim.isAdmin)
  const { theme, setTheme } = useContext(ThemeContext);
  let isUserLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const dispatch = useDispatch();

  const navigation = [
    { name: translation.Home, href: "", current: true },
    { name: translation.Products, href: "products", current: false },
  ];
  const adminPanal = [
    { name: translation.Home, href: "", current: true },
    { name: translation.Products, href: "products", current: false },
    { name: translation.Dashboard, href: "dashboard", current: false },
  ];

  const changeTheme = (event) => {
    setTheme(event.target.value)
    localStorage.setItem('theme', event.target.value);
    // console.log(theme)
  }

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(changeAuth(false));
    navigate("/");
  };
  const AdminLogOut = () => {
    localStorage.removeItem("ad");
    dispatch(changeAmdinAuth(false));
    navigate("/");
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>

      <Disclosure as="nav" className="bg-black dark:bg-gray-900 relative z-[10] ">

        {({ open }) => (
          <>
            <div className="customContainer ">
              <div className="relative flex h-16 items-center justify-between">
                {!iSAdmin && <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative block  items-center justify-center rounded-md p-2 text-white hover:bg-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>}
                {/* <div className="flex flex-1 items-center  md:justify-between ms-10 sm:items-stretch sm:justify-start"> */}

                <div className={`flex flex-shrink-0 items-center ${myLang=='en'?'ms-10':""} lg:ms-0 `}>
                  <img
                    className="h-12 text-center "
                    src={logo}
                    alt="Your Company"
                  />
                  <span className="text-white font-bold text-2xl">
                    {" "}
                    V-Trade
                  </span>
                  {/* </div> */}
                </div>
                {!iSAdmin && <div className="hidden sm:ml-6 lg:block">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          "text-white hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>}
                {iSAdmin && <div className="hidden sm:ml-6 lg:block">
                  <div className="flex space-x-4 ">
                    {adminPanal.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          "text-white hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>}
                {/* theme */}
                <div className={`flex flex-row justify-center items-center ${myLang=='ar'?'me-10':""}`}>
                  <LangDrop />
                  <select value={localStorage.getItem('theme')} className="cursor-pointer appearance-none rounded-md px-3 py-2 text-sm font-medium hidden sm:ml-6 md:block dark:bg-gray-900 bg-black text-white outline-none" onChange={(event) => changeTheme(event)}>
                    <option value="light" >Light</option>
                    <option value="dark">Dark</option>
                  </select>
                  {theme === 'dark' ? <FontAwesomeIcon icon={faMoon} className="text-white text-xl" /> :
                    <FontAwesomeIcon icon={faSun} className="text-white text-xl" />
                  }
                </div>

                <div className="hidden lg:flex me-5 inset-y-0 right-0  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  { }
                  {(!isUserLoggedIn && !iSAdmin) && (
                    <NavLink
                      to={"login"}
                      className={classNames(
                        "text-white hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={"page"}
                    >
                      {translation.Login}
                    </NavLink>
                  )}
                  {(!isUserLoggedIn && !iSAdmin) && (
                    <NavLink
                      to={"register"}
                      className={classNames(
                        "text-white hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={"page"}
                    >
                      {translation.Register}
                    </NavLink>
                  )}
                  {iSAdmin && (
                    <span
                      onClick={AdminLogOut}
                      className={classNames(
                        "text-white hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={"page"}
                    >
                      log out
                    </span>
                  )}
                  {/* {<Link

                        
                        to={"cart"}
                        className={classNames(
                          ' rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={ 'page'}
                      >
                        <i className="fa-solid fa-cart-shopping text-[#0fc80f]"><span className=" text-[8px] relative bottom-2">{cartCount}</span></i>
                      </Link>} */}
                  {/* {isUserLoggedIn &&<Link
                        
                        to={"wishlist"}
                        className={classNames(
                          ' rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={ 'page'}
                      >
                        <i className="fa-solid fa-heart text-red-400"><span className=" text-[8px] relative bottom-2">{wishCount}</span></i>
                      </Link>} */}

                  {isUserLoggedIn && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </MenuButton>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems
                          className={`absolute bg-black border text-center ${myLang === 'en' ? 'right-0' : 'left-0'} z-10 mt-2 w-48 origin-top-right rounded-md py-1 focus:outline-none`}>
                            <MenuItem>
                            <Link
                              to="cart"
                              className="hover:border-b m-auto w-fit text-center block px-4 py-2 text-sm text-white"
                            >
                              {translation.Cart} <i className="fa-solid fa-cart-shopping"></i>
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to="favorites"
                              className="hover:border-b m-auto w-fit text-center block px-4 py-2 text-sm text-white"
                            >
                              {translation.Favorites}  <i className="fa-regular fa-heart"></i>
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to="allorders"
                              className="hover:border-b m-auto w-fit text-center block px-4 py-2 text-sm text-white"
                            >
                              {translation.Orders}  <i className="fa-solid fa-wallet"></i>
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={logOut}
                              className="hover:border-b m-auto w-fit text-center block px-4 py-2 text-sm text-white"
                            >
                              {translation.LogOut} {" "}
                              <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>

              {!iSAdmin &&
                <DisclosurePanel className="lg:hidden flex  items-center justify-center flex-col">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        as="a"
                        to={item.href}
                        className={classNames(
                          "text-white ",
                          "hover:text-gray-400",
                          "block rounded-md px-3 py-2 text-base font-medium text-center"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    {(!isUserLoggedIn && !iSAdmin) && (
                    <NavLink
                      to={"login"}
                      className={classNames(
                        "text-white hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={"page"}
                    >
                      {translation.Login}
                    </NavLink>
                  )}
                  {(!isUserLoggedIn && !iSAdmin) && (
                    <NavLink
                      to={"register"}
                      className={classNames(
                        "text-white hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={"page"}
                    >
                      {translation.Register}
                    </NavLink>
                  )}
                  {iSAdmin && (
                    <span
                      onClick={AdminLogOut}
                      className={classNames(
                        "text-white hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={"page"}
                    >
                      log out
                    </span>
                  )}
                  </div>
                </DisclosurePanel>
              }
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
}