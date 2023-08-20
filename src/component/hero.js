import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero section-padding-t section-bg">
      <div className="container">
        <div className="row testi-row">
          <div className="col-12">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop={true}
              autoplay
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".prev",
                nextEl: ".next",
              }}
              className="hero__swiper"
            >
              <SwiperSlide>
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="hero__content position-relative">
                      <div className="badge-text mb-2 text-uppercase">
                        LET'S MAKE THE BEST INVESTMENT
                      </div>
                      <h1 className="display-4 mb-4 text-capitalize">
                        There Is No Friend As Loyal As A Book
                      </h1>
                      <p className="text-muted mb-5 fs-5">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Ad harum quibusdam, assumenda quia explicabo.
                      </p>
                      <Link to="/all-books" className="button button__primary">
                        <span>Shop now</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="hero__images text-center">
                      <img
                        className="img-fluid"
                        src="assets/images/hero.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="row align-items-center">
                  <div className="col-md-7 col-lg-6 mb-4 mb-lg-0">
                    <div className="hero__content position-relative">
                      <div className="badge-text mb-2 text-uppercase">
                        LET'S MAKE THE BEST INVESTMENT
                      </div>
                      <h1 className="display-4 mb-4 text-capitalize">
                        There Is No Friend As Loyal As A Book
                      </h1>
                      <p className="text-muted mb-5 fs-5">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Ad harum quibusdam, assumenda quia explicabo.
                      </p>
                      <Link to="/all-books" className="button button__primary">
                        <span>Shop now</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-5 offset-lg-1 text-center">
                    <div className="hero__image2 text-center">
                      <img
                        className="img-fluid"
                        src="assets/images/hero4.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="hero__content position-relative">
                      <div className="badge-text mb-2 text-uppercase">
                        LET'S MAKE THE BEST INVESTMENT
                      </div>
                      <h1 className="display-4 mb-4 text-capitalize">
                        There Is No Friend As Loyal As A Book
                      </h1>
                      <p className="text-muted mb-5 fs-5">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Ad harum quibusdam, assumenda quia explicabo.
                      </p>
                      <Link to="/all-books" className="button button__primary">
                        <span>Shop now</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="hero__images text-center">
                      <img
                        className="img-fluid"
                        src="assets/images/hero2.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="row align-items-center">
                  <div className="col-md-7 col-lg-6 mb-4 mb-lg-0">
                    <div className="hero__content position-relative">
                      <div className="badge-text mb-2 text-uppercase">
                        LET'S MAKE THE BEST INVESTMENT
                      </div>
                      <h1 className="display-4 mb-4 text-capitalize">
                        There Is No Friend As Loyal As A Book
                      </h1>
                      <p className="text-muted mb-5 fs-5">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Ad harum quibusdam, assumenda quia explicabo.
                      </p>
                      <Link to="/all-books" className="button button__primary">
                        <span>Shop now</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-5 offset-lg-1 text-center">
                    <div className="hero__image2 text-center">
                      <img
                        className="img-fluid"
                        src="assets/images/hero3.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="prev">
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div className="next">
              <MdOutlineNavigateNext />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
