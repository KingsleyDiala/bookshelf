import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useReducer, useEffect, useContext, useState } from "react";
import { db } from "../../firebase";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_books: [],
  all_books: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    author: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

export const FilterContextProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState([]);
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

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  // update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  // to clear the filter
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  // to sort the product
  useEffect(() => {
    dispatch({ type: "FILTER_BOOKS" });
    dispatch({ type: "SORTING_BOOKS" });
  }, [allBooks, state.sorting_value, state.filters]);

  // to load all the books for grid and list view
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_BOOKS", payload: allBooks });
  }, [allBooks]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
