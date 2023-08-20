import { useForm } from "react-hook-form";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useAllContext } from "./context/context";

const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;

const Confirm = ({ backToCart, setConfirm }) => {
  const { cart, setCart, price } = useAllContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (customerData, e) => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20would%20like%20to%20place%20an%20order.%0A%0A-----ORDER%20DETAILS-----%0A${cart.map(
        (data) =>
          `-%20${data.title}%20-%20${data.amount}%20copies.%20Price%3A%20%24${data.total}%0A`
      )}%0ATOTAL%20AMOUNT%20-%20%24${price}%0A%0A-----CUSTOMER%20INFO-----%0AName%3A%20${
        customerData.name
      }%0ANumber%3A%20${customerData.number}%0AEmail%3A%20${
        customerData.email
      }%0AAddress%3A%20${customerData.address}%0APostal%20Code%3A%20${
        customerData.postalCode
      }%0AHouse%3A%20${
        customerData.homeAddress
      }%0A%0A-------------------%0AWe%20will%20confirm%20your%20order%20upon%20receiving%20the%20message.`
    );
    e.target.reset();
    setCart([]);
    setConfirm(false);
  };

  return (
    <div className="confirm">
      <div className="row">
        <div className="section-title-center text-center">
          <div className="confirm__close" onClick={backToCart}>
            <HiArrowNarrowLeft />
          </div>
          <h2 className="fs-5">Checkout</h2>
          <div className="section-divider divider-triangle"></div>
        </div>
      </div>
      <form
        className="confirm__form bs-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-12 mb-4">
            <h3 className="title">Contact Information</h3>
            <input
              {...register("number", { required: true })}
              type="number"
              placeholder="Phone Number"
              className="mt-0"
            />
            {errors.number && <p>Phone number is required</p>}
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email Address"
            />
            {errors.email && <p>Email is required</p>}
          </div>
          <div className="col-12">
            <h3 className="title">Shipping Address</h3>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
            />
            {errors.name && <p>Name is required</p>}
            <textarea
              {...register("address", { required: true })}
              type="text"
              placeholder="Enter Address"
              rows="3"
            />
            {errors.address && <p>Address is required</p>}
          </div>
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              {...register("postalCode", { required: true })}
              type="number"
              placeholder="Postal Code"
            />
            {errors.postalCode && <p>Postal Code is required</p>}
          </div>
          <div className="col-md-6">
            <input
              {...register("homeAddress", { required: true })}
              type="text"
              placeholder="Apartment, Suite, etc."
            />
            {errors.homeAddress && <p>Apartment address is required</p>}
          </div>
          <div className="cart__confirm">
            <button type="submit" className="button button__primary">
              <span>Confirm Order</span>
            </button>
          </div>
        </div>
        <span className="text-center alert alert-success mt-3" role="alert">
          [Note: Your order will be confirmed via Whatsapp. You'll be redirect
          to whatsapp after clicking 'Confirm Order' button.]
        </span>
      </form>
    </div>
  );
};

export default Confirm;
