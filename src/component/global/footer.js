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
                <h3>Informationen zum Buch?</h3>
                <p>
                  Bitte senden Sie uns eine E-Mail an
                  giorgiqusikashvili1@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="footer__top">
              <div className="footer__top--icon">
                <IoIosHelpBuoy />
              </div>
              <div className="footer__top--info">
                <h3>Brauchen Sie Hilfe?</h3>
                <p>
                  Bitte rufen Sie uns an unter{" "}
                  <a href="tel:0152 19330138">0152 19330138</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer__bottom">
          <h3>
            <a href="/">Bücher</a>
          </h3>
          <p>
            © {getYear()} Alle Rechte vorbehalten. Made with Giorgi by Kingsley Diala
            <AiFillHeart />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
