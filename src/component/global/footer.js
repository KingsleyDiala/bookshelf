import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsStack } from "react-icons/bs";
import { IoIosHelpBuoy } from "react-icons/io";

const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="footer section-padding-t">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="footer__top">
              <div className="footer__top--icon">
                <BsStack />
              </div>
              <div className="footer__top--info">
                <h3>Book Information?</h3>
                <p>Please send us an email at support@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="footer__top">
              <div className="footer__top--icon">
                <IoIosHelpBuoy />
              </div>
              <div className="footer__top--info">
                <h3>Need Help?</h3>
                <p>Please call us at <a href="tel:0123456789">0123456789</a></p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer__bottom">
          <h3><a href="/">Bookshelf</a></h3>
          <p>
            © {getYear()} All right reserved. Made withfooter by <AiFillHeart /> {" "}
            <a href="https://themeforest.net/user/themeatelier">ThemeAtelier</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
