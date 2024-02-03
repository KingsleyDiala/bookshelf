import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { HiViewList } from "react-icons/hi";
import { useFilterContext } from "./context/filter_context";

const AllBookNav = () => {
  const { filter_books, grid_view, setGridView, setListView, sorting } =
    useFilterContext();
  return (
    <div className="book-nav">
      <div className="book-nav__view">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}
        >
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={!grid_view ? "active sort-btn" : " sort-btn"}
          onClick={setListView}
        >
          <HiViewList className="icon" />
        </button>
      </div>
      <p>{`${filter_books.length} Bücher verfügbar`}</p>
    </div>
  );
};

export default AllBookNav;
