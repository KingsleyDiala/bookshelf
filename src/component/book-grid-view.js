import {
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useAllContext } from "./context/context";
import { useFilterContext } from "./context/filter_context";
import OpenModal from "./open-modal";
import { useNavigate } from 'react-router-dom'

const BookGridView = () => {
  const { filter_books } = useFilterContext();
  const { cart, addToCart, handleChange, handleRemove } = useAllContext();
  const navigate = useNavigate();

  return (
    <div className="row ">
      {filter_books.map((book) => (
        <div className="col-lg-4 col-sm-6 mb-4" key={book.id}>
          <div className="all-book__item">
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
            <div className="all-book__item__bottom">
              <h3
                style={{ marginTop: "10px" }}
                className="all-book__item__bottom--title"
              >
                {book.title}
              </h3>
              <p
                style={{ marginTop: "10px" }}
                className="all-book__item__bottom--subtitle"
              >
                {book.subtitle.substring(0, 70)}
              </p>
              <p
                style={{ marginTop: "20px" }}
                className="all-book__item__bottom--author"
              >
                Von: <span>{book.author}</span>
              </p>
              <div className="all-book__item__bottom--button">
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
                  <button onClick={() => navigate(`/books/${book.id}`)} className="button button__primary">
                    <span>Mehr erfahren</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGridView;
