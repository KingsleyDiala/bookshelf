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
      <p>{`${filter_books.length} Product Available`}</p>

      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onClick={sorting}
          >
            <option value="lowest">Preis(niedrigste)</option>
            <option value="highest">Preis(höchste)</option>
            <option value="a-z">(a-z)</option>
            <option value="z-a">(z-a)</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default AllBookNav;
