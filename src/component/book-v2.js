import React, { useRef, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useAllContext } from "./context/context";
import { useOnClickOutside } from "./helper/useOnClickOutside";

const BookV2 = ({ book }) => {
  const { cart, addToCart, handleChange, handleRemove } = useAllContext();
  const [isOpen, setOpen] = useState(false);
  const elRef = useRef();
  useOnClickOutside(elRef, () => setOpen(false));
  console.log("isOpen", isOpen);
  const baseClass = `booksv2__item ${isOpen ? "details-show" : ""}`.trim();

  const removeClick = () => {
    setOpen(true);
  };

  return (
    <div ref={elRef} className="col-lg-4 col-md-6 mb-4">
      <div className={baseClass}>
        <div
          className="booksv2__item__top"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="booksv2__item__top--image">
            <img className="img-fluid" src={book.img} alt={book.title} />
            {book.offer === "0" ? (
              ""
            ) : (
              <span className="books__book__discount">
                <span className="on-sale">-{book.offer}%</span>
              </span>
            )}
          </div>
          <div className="booksv2__item__top__content">
            <h3>{book.title}</h3>
            <p>{book.subtitle}</p>
            <p>
              By: <span>{book.author}</span>
            </p>
            <p>
              Price:{" "}
              {parseInt(book.price) === book.offerPrice ? (
                <>
                  <span>${book.price}</span>
                </>
              ) : (
                <>
                  <del>${book.price}</del> <span>${book.offerPrice}</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="booksv2__item__details" onClick={removeClick}>
          <p>{book.desc}</p>
          <ul className="row">
            <li className="col-sm-6 mb-2">
              <span className="title">Category</span>
              <p>{book.category}</p>
            </li>
            <li className="col-sm-6 mb-2">
              <span className="title">Author</span>
              <p>{book.author}</p>
            </li>
            <li className="col-sm-6 mb-2">
              <span className="title">Language</span>
              <p>{book.language}</p>
            </li>
            <li className="col-sm-6 mb-2">
              <span className="title">Total pages</span>
              <p>{book.pages}</p>
            </li>
            <li className="col-sm-6">
              <span className="title">Publisher</span>
              <p>{book.publisher}</p>
            </li>
            <li className="col-sm-6 mb-2">
              <span className="title">Published</span>
              <p>{book.publishedDate}</p>
            </li>
            <li className="col-sm-6 mb-2 mb-sm-0">
              <span className="title">ISBN</span>
              <p>{book.isbn}</p>
            </li>
            <li className="col-sm-6">
              <>
                {cart.find((data) => data.id === book.id) ? (
                  <>
                    {cart.map((newData) =>
                      newData.id === book.id ? (
                        <div key={newData.id} className="calculation">
                          <div className="calculation__button">
                            {newData.amount === 1 ? (
                              <button onClick={() => handleRemove(book.id)}>
                                <AiOutlineDelete />
                              </button>
                            ) : (
                              <button onClick={() => handleChange(newData, -1)}>
                                <AiOutlineMinus />
                              </button>
                            )}
                            <span>{newData.amount}</span>
                            <button onClick={() => handleChange(newData, 1)}>
                              <AiOutlinePlus />
                            </button>
                          </div>
                          <span>${newData.total}</span>
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
                      Add to cart
                    </span>
                  </button>
                )}
              </>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookV2;
