import {
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useAllContext } from "./context/context";
import { useFilterContext } from "./context/filter_context";
import OpenModal from "./open-modal";

const BookGridView = () => {
  const { filter_books } = useFilterContext();
  const { cart, addToCart, handleChange, handleRemove } = useAllContext();

  return (
    <div className="row justify-content-center">
      {filter_books.map((book) => (
        <div className="col-lg-4 col-sm-6 mb-4" key={book.id}>
          <div className="all-book__item">
            <img className="img-fluid" src={book.img} alt={book.title} />
            {book.offer === "0" ? (
              ""
            ) : (
              <span className="all-book__item__discount">
                <span className="on-sale">-{book.offer}%</span>
              </span>
            )}
            <ul className="functional-icons">
              <li>
                <button className="icon" onClick={() => addToCart(book)}>
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
            <div className="all-book__item__bottom">
              <h3 className="all-book__item__bottom--title">{book.title}</h3>
              <p className="all-book__item__bottom--subtitle">
                {book.subtitle}
              </p>
              <p className="all-book__item__bottom--author">
                By: <span>{book.author}</span>
              </p>
              <div className="price">
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
              </div>
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGridView;
