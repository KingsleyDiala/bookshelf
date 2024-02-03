import {
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useAllContext } from "./context/context";
import { useFilterContext } from "./context/filter_context";
import OpenModal from "./open-modal";
import { useNavigate } from "react-router-dom";


const BookListView = () => {
  const { filter_books } = useFilterContext();
  const { cart, addToCart, handleChange, handleRemove } = useAllContext();
  const navigate = useNavigate();
  return (
    <div className="row justify-content-center">
      {filter_books.map((book) => (
        <div className="col-12 mb-4" key={book.id}>
          <div className="book-list">
            <div className="row">
              <div className="col-5">
                <div className="book-list__left">
                  <img className="img-fluid" src={book.url} alt={book.title} />
                  <ul className="functional-icons">
                    <li>
                      <OpenModal
                        book={book}
                        handleRemove={handleRemove}
                        handleChange={handleChange}
                        addToCart={addToCart}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-7">
                <div className="book-list__content">
                  <h3 className="book-list__content--title">{book.title}</h3>
                  <p className="book-list__content--subtitle">
                    {book.subtitle}
                  </p>
                  <p className="book-list__content--author">
                    von: <span>{book.author}</span>
                  </p>
                  <div className="book-list__content--button">
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
                                  <button
                                    onClick={() => handleChange(newData, -1)}
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
                              <span>${newData.total}</span>
                            </div>
                          ) : (
                            ""
                          )
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => navigate(`/books/${book.id}`)}
                        className="button button__primary"
                      >
                        <span className="d-flex align-items-center gap-2">
                          Mehr erfahren
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookListView;
