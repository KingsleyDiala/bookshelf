const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_BOOKS":
      let priceArr = action.payload.map((curElem) => curElem.price);
      let maxPrice = Math.max(...priceArr);

      return {
        ...state,
        filter_books: [...action.payload],
        all_books: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_BOOKS":
      let newSortData;

      const { filter_books, sorting_value } = state;
      let tempSortProduct = [...filter_books];

      const sortingBooks = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          return a.title.localeCompare(b.title);
        }

        if (sorting_value === "z-a") {
          return b.title.localeCompare(a.title);
        }
      };

      newSortData = tempSortProduct.sort(sortingBooks);

      return {
        ...state,
        filter_books: newSortData,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_BOOKS":
      let { all_books } = state;
      let tempFilterProduct = [...all_books];

      const { text, category, author, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.title.toLowerCase().includes(text);
        });
      }

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        );
      }

      if (author !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.author.toLowerCase() === author.toLowerCase()
        );
      }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price === price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }
      return {
        ...state,
        filter_books: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          author: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
