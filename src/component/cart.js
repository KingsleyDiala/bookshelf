import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { useAllContext } from "./context/context";

const Cart = ({ cartDrawer, confirmBook }) => {
  const { cart, handleChange, price, handleRemove } = useAllContext();

  return (
    <div className="cart">
      <div className="row">
        <div className="section-title-center text-center">
          <div className="cart__close" onClick={cartDrawer}>
            <MdOutlineClose />
          </div>
          <h2 className="fs-5">Ihre Artikel im Warenkorb</h2>
          <div className="section-divider divider-triangle"></div>
        </div>
      </div>
      <div className="cart__books bs-scroll">
        {cart.map((cartItem) => (
          <div className="row mb-3" key={cartItem.id}>
            <div className="col-sm-4 mb-3 mb-sm-0">
              <div className="cart__books__image">
                <img src={cartItem.url} alt="book" className="img-fluid" />
              </div>
            </div>
            <div className="col-sm-8 ps-sm-0">
              <div className="cart__books__content">
                <p className="title">{cartItem.title}</p>
                price:{" "}
                {parseInt(cartItem.price) === cartItem?.offer ? (
                  <>
                    <span>${cartItem.price}</span>
                  </>
                ) : (
                  <>
                    <del>${cartItem.price}</del>{" "}
                    <span>${cartItem.offer}</span>
                  </>
                )}
                <div className="calculation">
                  <div className="calculation__button">
                    {cartItem.amount === 1 ? (
                      <button onClick={() => handleRemove(cartItem.id)}>
                        <AiOutlineDelete />
                      </button>
                    ) : (
                      <button onClick={() => handleChange(cartItem, -1)}>
                        <AiOutlineMinus />
                      </button>
                    )}
                    <span>{cartItem.amount}</span>
                    <button onClick={() => handleChange(cartItem, 1)}>
                      <AiOutlinePlus />
                    </button>
                  </div>
                  <span className="calculation__price">${cartItem.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart__confirm">
        <div className="cart__confirm__price">
          <span>Zwischensumme:</span>
          <strong>${price}</strong>
        </div>
        <button className="button button__primary" onClick={confirmBook}>
          <span>Bestätigen</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
