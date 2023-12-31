import React, { useState } from "react";
import LoadingSpinner from "./loading-spinner";
import Bookv3 from "./book";
import { useAllContext } from "./context/context";

const Booksv3 = () => {
  const [visible, setVisible] = useState(8);

  const showMoreBooks = () => {
    setVisible((pervValue) => pervValue + 4);
  };

  const { allBooks, query, myRef, isLoading } = useAllContext();

  return (
    <div id="books" className="books section-padding section-bg" ref={myRef}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
            <div className="section-title-center text-center">
              <span>Bücher-Galerie</span>
              <h2 className="display-6">Beliebte Bücher</h2>
              <div className="section-divider divider-triangle"></div>
            </div>
          </div>
        </div>
        <div className="row">
          {isLoading ? (
            <LoadingSpinner className="mb-4 col-md-6 col-lg-3" />
          ) : (
            allBooks
              .filter((book) => book.title.toLowerCase().includes(query))
              .slice(0, visible)
              .map((book) => <Bookv3 book={book} key={book.id} />)
          )}
        </div>
        <div className="book-load-btn text-center mt-4">
          {allBooks.length <= visible || query !== "" ? (
            ""
          ) : (
            <button onClick={showMoreBooks} className="button button__primary">
              <span> Mehr laden </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booksv3;
