import React, { useEffect, useState, useRef, useContext, createContext } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
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
  
    const addToCart = (item) => {
      item.amount = 1;
      item.total = parseInt(item.offerPrice);
      if (cart.find((data) => data.id === item.id)) return;
      setCart([...cart, item]);
    };
  
    const handleChange = (item, d) => {
      const ind = cart.indexOf(item);
      const arr = cart;
      arr[ind].amount += d;
      arr[ind].total = item.amount * parseInt(item.offerPrice);
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
      cart.map((item) => (ans += item.amount * parseInt(item.offerPrice)));
      setPrice(ans);
    };
  
    useEffect(() => {
      const unsub = onSnapshot(
        collection(db, "books"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setAllBooks(list);
        },
        (error) => {
          console.log(error);
        }
      );
  
      return () => {
        unsub();
      };
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
        } else setAdmin("");
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
            setCart,
            setQuery,
            query,
            price,
            admin,
            executeScroll,
            myRef,
          }}
        >
            {children}
        </Context.Provider>
    );
};

export const useAllContext = () => {
    return useContext(Context);
  };