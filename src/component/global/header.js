import { json, useNavigate } from "react-router-dom";
import { useEffect, useId, useState } from "react";
import { Navbar } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { CgShoppingBag } from "react-icons/cg";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import Drawer from "react-modern-drawer";
import Cart from "../cart";
import Confirm from "../confirm";
import { useAllContext } from "../context/context";

const Header = ({ headers }) => {
  const { executeScroll, cart, setCart, price, setQuery, admin, logOut } = useAllContext();
  const [fix, setFix] = useState(false);
  const [search, setSearch] = useState(false);
  const [signOutMessage, setSignOutMessage] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(JSON.parse(window.sessionStorage.getItem("user")));
  }, [window.sessionStorage.length]);

  function setFixed() {
    if (window.scrollY >= 100) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener("scroll", setFixed);
  function setSearchField() {
    if (window.scrollY >= 470) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  }
  window.addEventListener("scroll", setSearchField);

  // Drawer
  const [headerOpen, setHeaderOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const headerDrawer = () => {
    setHeaderOpen((prevState) => !prevState);
  };
  const cartDrawer = () => {
    setCartOpen((prevState) => !prevState);
  };

  const confirmBook = () => {
    setConfirm((prevState) => !prevState);
    setCartOpen(false);
  };
  const backToCart = () => {
    setConfirm((prevState) => !prevState);
    setCartOpen(true);
  };

  let cartItem = cart === null ? 0 : cart.length;

  const handleSignOut = () => {
    logOut();
    navigate("/");
  };

  const baseClass = `${fix ? "header navbar_fixed" : "header"} ${
    headers === "all-book" ? "all-book" : ""
  } ${headers === "minimal" ? "minimal" : ""} ${
    headers === "modern" ? "modern" : ""
  } ${headers === "classic" ? "classic" : ""} ${
    headers === "manage-book" ? "manage-book" : ""
  } ${search ? "search" : ""} ${
    headers === "add-book" ? "add-book" : ""
    }`.trim();

  return (
    <header className={baseClass}>
      <div className="container">
        <div className="row">
          <Navbar className="p-0">
            <button className="header__menu-btn" onClick={headerDrawer}>
              <span className="header__menu-btn__icon">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </span>
            </button>
            <Link to="/" className="header__logo">
              <h1 className="m-0">BÜCHER.</h1>
              {/* <img src={siteLogo.logo} alt={siteLogo.alt} /> */}
            </Link>
            <div className="header__search">
              <form>
                <span className="header__search--icon">
                  <BsSearch />
                </span>
                <input
                  type="text"
                  placeholder="Suchen Sie Ihr Buch hier"
                  onClick={(e) => executeScroll()}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
            </div>
            <Drawer
              open={headerOpen}
              onClose={headerDrawer}
              direction="left"
              className=" drawer"
              size={400}
            >
              <div className="header-menu">
                <div className="header-menu__top">
                  <h1>Bücher</h1>
                  <span onClick={headerDrawer}>
                    <MdOutlineClose />
                  </span>
                </div>
                <ul className="bs-scroll">
                  <Link to="/">
                    <li>Startseite</li>
                  </Link>
                  <Link to="/all-books">
                    <li>Alle Bücher</li>
                  </Link>
                  <li>{signOutMessage}</li>
                  {auth ? (
                    <>
                      <Link to="/add-book">
                        <li>Buch hinzufügen</li>
                      </Link>
                      <Link to="/manage-book">
                        <li>Buch verwalten</li>
                      </Link>
                      <li>
                        <button
                          className="button button__primary"
                          onClick={handleSignOut}
                        >
                          <span>Abmelden</span>
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to='/login'>
                          <button className="button button__primary">
                            <span>Anmelden</span>
                          </button>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </Drawer>
            
          </Navbar>
        </div>
      </div>
    </header>
  );
};

export default Header;
