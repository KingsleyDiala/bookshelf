import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdZoomOutMap } from "react-icons/md";
import { useAllContext } from "./context/context";

const OpenModal = ({ book, handleRemove, handleChange, addToCart }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

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
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
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
                    <span>Seiten</span>: {book.pages}
                  </li>
                )}
                <li>
                  <span>Herausgeber</span>: {book.publisher}
                </li>
                <li>
                  <span>Veröffentlicht</span>: {book?.publishedDate || "N/A"}
                </li>
                {book.isbn === "" ? (
                  "N/A"
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
                    style={{marginTop: '30px'}}
                  onClick={() => navigate(`/books/${book.id}`)}
                  className="button button__primary w-100 mt-3"
                >
                  <span>Mehr erfahren</span>
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
