import React, { useEffect, useState, useRef, useContext, createContext } from 'react';
import { auth, db } from '../../firebase';

const Context = createContext();

const getLocalStorage = () => {
    const data = localStorage.getItem("bookData", 1);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

export const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState(getLocalStorage());
    const [price, setPrice] = useState(0);
    const [allBooks, setAllBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
    const addToCart = (item) => {
      item.amount = 1;
      item.total = parseInt(item.offer ? item.offer : item.price);
      if (cart.find((data) => data.id === item.id)) return;
      setCart([...cart, item]);
    };
  
    const handleChange = (item, d) => {
      const ind = cart.indexOf(item);
      const arr = cart;
      arr[ind].amount += d;
      arr[ind].total = item.amount * parseInt(item.offer ? item.offer : item.price);
      if (arr[ind].amount === 0) arr[ind].amount = 1;
      setCart([...arr]);
    };
  
    const handleRemove = (id) => {
      const arr = cart.filter((item) => item.id !== id);
      setCart(arr);
      handlePrice();
    };
  
    const handlePrice = () => {
      let ans = 0;
      cart.map((item) => (ans += item.amount * parseInt(item.offer ? item.offer : item.price)));
      setPrice(ans);
    };
    useEffect(() => {
      
    }, []);
  
    useEffect(() => {
      handlePrice();
    });
  
    useEffect(() => {
      localStorage.setItem("bookData", JSON.stringify(cart));
    }, [cart]);
  
    const [admin, setAdmin] = useState("");
  
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setAdmin(user.email);
        } else setAdmin("giorgiqusikashvili1@gmail.com");
      });
    }, []);
  
    // scroll
    const myRef = useRef(null);
  
    const executeScroll = () => {
      const newRef = myRef.current;
      newRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
    return (
        <Context.Provider
        value={{
            cart,
            addToCart,
            handleChange,
            handleRemove,
            allBooks,
            setAllBooks,
            setCart,
            setQuery,
            query,
            price,
            admin,
            executeScroll,
            myRef,
            isLoading,
            setIsLoading,
          }}
        >
            {children}
        </Context.Provider>
    );
};

export const useAllContext = () => {
    return useContext(Context);
  };