import React, { useState } from "react";
import BookV2 from "./book-v2";
import { useAllContext } from "./context/context";
import LoadingSpinner from "./loading-spinner";

const Booksv2 = () => {
  const [visible, setVisible] = useState(9);
  const showMoreBooks = () => {
    setVisible((pervValue) => pervValue + 3);
  };

  const { allBooks, query, myRef } = useAllContext();

  return (
    <div id="books" className="booksv2 section-padding section-bg" ref={myRef}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
            <div className="section-title-center text-center">
              <span>Books Gallery</span>
              <h2 className="display-6">Popular Books</h2>
              <div className="section-divider divider-triangle"></div>
            </div>
          </div>
        </div>
        <div className="row">
          {allBooks.length === 0 ? (
            <LoadingSpinner className="col-lg-4 col-md-6 mb-4" />
          ) : (
            allBooks
              .filter((book) => book.title.toLowerCase().includes(query))
              .slice(0, visible)
              .map((book) => <BookV2 book={book} key={book.id} />)
          )}
        </div>
        <div className="book-load-btn text-center mt-4">
          {allBooks.length <= visible || query !== "" ? (
            ""
          ) : (
            <button onClick={showMoreBooks} className="button button__primary">
              <span> Load More </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booksv2;
