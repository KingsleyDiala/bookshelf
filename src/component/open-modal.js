import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdZoomOutMap } from "react-icons/md";
import { useAllContext } from "./context/context";

const OpenModal = ({ book, handleRemove, handleChange, addToCart }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cart } = useAllContext();

  return (
    <>
      <div className="icon" onClick={handleShow}>
        <MdZoomOutMap />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal fade signInModal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal__wrapper">
          <div className="modal__wrapper--top">
            <h3>{book.title}</h3>
            <span className="close" onClick={handleClose}>
              <AiOutlineClose />
            </span>
          </div>
          <div className="row modal__wrapper__bottom">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img className="img-fluid" src={book.url} alt={book.title} />
            </div>
            <div className="col-lg-6">
              <p className="description">{book.desc}</p>
              <ul>
                <li>
                  <span>Genres</span>: {book.genres}
                </li>
                <li>
                  <span>Author</span>: {book.author}
                </li>
                <li>
                  <span>Language</span>: {book.language}
                </li>
                {book.pages === "" ? (
                  ""
                ) : (
                  <li>
                    <span>Total Pages</span>: {book.pages}
                  </li>
                )}
                <li>
                  <span>Price</span>: ${book.price}
                </li>
                <li>
                  <span>Offer Price</span>: ${book.offerPrice}
                </li>
                <li>
                  <span>Publisher</span>: {book.publisher}
                </li>
                <li>
                  <span>Published</span>: {book.publishedDate}
                </li>
                {book.isbn === "" ? (
                  ""
                ) : (
                  <li>
                    <span>ISBN</span>: {book.isbn}
                  </li>
                )}
              </ul>
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
                  className="button button__primary w-100 mt-3"
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
      </Modal>
    </>
  );
};

export default OpenModal;
