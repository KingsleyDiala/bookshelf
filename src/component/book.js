import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import {
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { useAllContext } from "./context/context";

const Bookv3 = ({ book }) => {
  const [bookOpen, setBookOpen] = useState(false);

  const bookDrawer = () => {
    setBookOpen((prevState) => !prevState);
  };

  const { cart, addToCart, handleChange, handleRemove } = useAllContext();
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="books__book">
        <img
          className="img-fluid"
          style={{ cursor: "pointer" }}
          onClick={bookDrawer}
          src={book.url}
          alt={book.title}
        />
        {book.offer === "0" ? (
          ""
        ) : (
          <span className="books__book__discount">
            <span className="on-sale">-{book.offer}%</span>
          </span>
        )}
        <div className="books__book__bottom">
          <h3 className="books__book__bottom--title">{book.title}</h3>
          <p className="books__book__bottom--subtitle">{book.subtitle}</p>
          <p className="books__book__bottom--author">
            By: <span>{book.author}</span>
          </p>
          <div className="price">
            price:{" "}
            {parseInt(book.price) === book.price ? (
              <>
                <span>${book.price}</span>
              </>
            ) : (
              <>
                <del>${book.price}</del> <span>${book.price}</span>
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
                  Warenkorb
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <Drawer
        open={bookOpen}
        onClose={bookDrawer}
        direction="right"
        className=" drawer"
        size={450}
      >
        <div className="cart">
          <div className="row">
            <div className="section-title-center text-center mb-4">
              <div className="cart__close" onClick={bookDrawer}>
                <MdOutlineClose />
              </div>
              <h2 className="fs-5">{book.title}</h2>
              <div className="section-divider divider-triangle"></div>
            </div>
          </div>
          <div className="cart__book bs-scroll">
            <div className="cart__book--image">
              <img src={book.url} alt={book.title} />
            </div>
            <p className="mb-2">{book.description}</p>
            <ul>
              <li>
                <span>Genres</span>: {book.genres}
              </li>
              <li>
                <span>Autor</span>: {book.author}
              </li>
              <li>
                <span>Sprache</span>: {book.language}
              </li>
              {book.pages === "" ? (
                ""
              ) : (
                <li>
                  <span>Gesamte Seiten</span>: {book.pages}
                </li>
              )}
              <li>
                <span>price</span>: ${book.price}
              </li>
              <li>
                <span>Angebotsprice</span>: ${book.offer}
              </li>
              <li>
                <span>Herausgeber</span>: {book.publisher}
              </li>
              <li>
                <span>Veröffentlicht</span>: {book.publish_year}
              </li>
              {book.isbn === "" ? (
                ""
              ) : (
                <li>
                  <span>ISBN</span>: {book.isbn}
                </li>
              )}
            </ul>
          </div>
          <div className="cart__confirm">
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
                <span className="d-flex align-items-center gap-2 justify-content-center">
                  <AiOutlineShoppingCart />
                  Warenkorb
                </span>
              </button>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Bookv3;
