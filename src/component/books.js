import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useAllContext } from "./context/context";
import LoadingSpinner from "./loading-spinner";
import OpenModal from "./open-modal";

const Books = () => {
  const [visible, setVisible] = useState(8);
  const showMoreBooks = () => {
    setVisible((pervValue) => pervValue + 4);
  };

  const {
    cart,
    allBooks,
    addToCart,
    handleChange,
    handleRemove,
    query,
    myRef,
  } = useAllContext();

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
          {allBooks.length === 0 ? (
            <LoadingSpinner className="mb-4 col-md-6 col-lg-3" />
          ) : (
            allBooks
              .filter((book) => book.title.toLowerCase().includes(query))
              .slice(0, visible)
              .map((book) => (
                <div className="col-lg-3 col-md-6 mb-4" key={book.id}>
                  <div className="books__book">
                    <img
                      className="img-fluid"
                      src={book.img}
                      alt={book.title}
                    />
                    {book.offer === "0" ? (
                      ""
                    ) : (
                      <span className="books__book__discount">
                        <span className="on-sale">-{book.offer}%</span>
                      </span>
                    )}
                    <ul className="functional-icons">
                      <li>
                        <button
                          onClick={() => addToCart(book)}
                          className="icon"
                        >
                          <AiOutlineShoppingCart />
                        </button>
                      </li>
                      <li>
                        <OpenModal
                          book={book}
                          handleRemove={handleRemove}
                          handleChange={handleChange}
                          addToCart={addToCart}
                        />
                      </li>
                    </ul>
                    <div className="books__book__bottom">
                      <h3 className="books__book__bottom--title">
                        {book.title}
                      </h3>
                      <p className="books__book__bottom--subtitle">
                        {book.subtitle}
                      </p>
                      <p className="books__book__bottom--author">
                        Von: <span>{book.author}</span>
                      </p>
                      <div className="price">
                        Preis:{" "}
                        {parseInt(book.price) === book.offerPrice ? (
                          <>
                            <span>€{book.price}</span>
                          </>
                        ) : (
                          <>
                            <del>€{book.price}</del>{" "}
                            <span>€{book.offerPrice}</span>
                          </>
                        )}
                      </div>
                      <div className="books__book__bottom--button">
                        {cart.find((data) => data.id === book.id) ? (
                          <>
                            {cart.map((newData) =>
                              newData.id === book.id ? (
                                <div key={newData.id} className="calculation">
                                  <div className="calculation__button">
                                    {newData.amount === 1 ? (
                                      <button
                                        onClick={() => handleRemove(book.id)}
                                      >
                                        <AiOutlineDelete />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleChange(newData, -1)
                                        }
                                      >
                                        <AiOutlineMinus />
                                      </button>
                                    )}
                                    <span>{newData.amount}</span>
                                    <button
                                      onClick={() => handleChange(newData, 1)}
                                    >
                                      <AiOutlinePlus />
                                    </button>
                                  </div>
                                  <span>€{newData.total}</span>
                                </div>
                              ) : (
                                ""
                              )
                            )}
                          </>
                        ) : (
                          <button
                            onClick={() => addToCart(book)}
                            className="button button__primary"
                          >
                            <span>
                              <AiOutlineShoppingCart />
                              Warenkorb
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
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

export default Books;
