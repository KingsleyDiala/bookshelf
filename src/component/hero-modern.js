import React from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroModern = () => {
  return (
    <>
      <div className="container-fluid hero-modern">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          spaceBetween={50}
          slidesPerView={4}
          autoplay
          navigation={{ clickable: true }}
          className="hero__swiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
        >
          <SwiperSlide className="hero-modern__card">
            <div className="row align-items-center">
              <div className="col-6 g-0">
                <div className="ps-3">
                  <h5>Fast Delivery</h5>
                  <p>Delivery in 90 minutes</p>
                  <Link to="/all-books" className="button button__primary">
                    <span>Shop Now</span>
                  </Link>
                </div>
              </div>
              <div className="col-6 g-0">
                <img
                  className="img-fluid"
                  src="assets/images/delivery.png"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="hero-modern__card">
            <div className="row align-items-center">
              <div className="col-6 g-0">
                <div className="ps-3">
                  <h5>New Books</h5>
                  <p>Find all new books</p>
                  <Link to="/all-books" className="button button__primary">
                    <span>Shop Now</span>
                  </Link>
                </div>
              </div>
              <div className="col-6 g-0">
                <img
                  className="img-fluid"
                  src="assets/images/books.png"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="hero-modern__card">
            <div className="row align-items-center">
              <div className="col-6 g-0">
                <div className="ps-3">
                  <h5>Use Coupon</h5>
                  <p>Get 40% off with coupon</p>
                  <Link to="/all-books" className="button button__primary">
                    <span>Shop Now</span>
                  </Link>
                </div>
              </div>
              <div className="col-6 g-0">
                <img
                  className="img-fluid"
                  src="assets/images/offer.png"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="hero-modern__card">
            <div className="row align-items-center">
              <div className="col-6 g-0">
                <div className="ps-3">
                  <h5>Running Offer</h5>
                  <p>10% off on every book</p>
                  <Link to="/all-books" className="button button__primary">
                    <span>Shop Now</span>
                  </Link>
                </div>
              </div>
              <div className="col-6 g-0">
                <img
                  className="img-fluid"
                  src="assets/images/order.png"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="order-process">
          <div className="row align-items-center">
            <div className="col-lg-3 mb-4 mb-lg-0">
              <div className="order-process__item">
                <span>1</span>
                <div>
                  <h5>Your order</h5>
                  <p>
                    Add products to your cart, enter your details and confirm.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mb-4 mb-lg-0">
              <div className="order-process__item">
                <span>2</span>
                <div>
                  <h5>Picking Your order</h5>
                  <p>
                    Your order is being picked and now will be forwarded for
                    packaging.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mb-4 mb-lg-0">
              <div className="order-process__item">
                <span>3</span>
                <div>
                  <h5>Packing Your Order</h5>
                  <p>
                    We are packing your order and will be out for delivery soon.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mb-4 mb-lg-0">
              <div className="order-process__item">
                <span>4</span>
                <div>
                  <h5>Deliver</h5>
                  <p>
                    Your order has been prepared and out for delivery. It will
                    be delivered soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroModern;
