import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const mailchimpLink = process.env.REACT_APP_MAILCHAIMP;

//SUBSCRIBE FORM
function SubscribeForm({ status, message, onValidated }) {
  let email;
  const submit = (e) => {
    e.preventDefault();
    onValidated({
      EMAIL: email.value,
    });
  };

  return (
    <form>
      <div className="input">
        <input
          ref={(node) => (email = node)}
          type="email"
          required
          placeholder="Your email"
        />
        <button
          type="submit"
          className="button button__primary"
          onClick={submit}
        >
          <span>Subscribe</span>
        </button>
      </div>

      <div className="message col mt-3">
        {status === "sending" && (
          <div className=" alert alert-warning">sending...</div>
        )}
        {status === "error" && (
          <div
            className="alert alert-danger"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </div>
      {status === "success" && (
        <div
          className="alert alert-success mt-3"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </form>
  );
}

const Subscribe = () => {
  return (
    <div className="section-padding subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="row subscribe__wrapper">
              <div className="col-md-5 mb-4 mb-md-0 subscribe__wrapper--images">
                <div
                  className="subscribe__image"
                  style={{ backgroundImage: "url(assets/images/cover-1.jpg)" }}
                ></div>
              </div>
              <div className="col-md-7">
                <div className="subscribe__content">
                  <h3 className="display-6">Join Our Community</h3>
                  <p className="subscribe__content--subtitle">
                    Sign up & get 10% of your first books.
                  </p>
                  <MailchimpSubscribe
                    url={mailchimpLink}
                    render={({ subscribe, status, message }) => (
                      <SubscribeForm
                        status={status}
                        message={message}
                        onValidated={(formData) => subscribe(formData)}
                      />
                    )}
                  />
                  <ul className="subscribe__content--social mt-3">
                    <li>
                      <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <Link to="#">
                        <FaInstagram />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FaLinkedinIn />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FaYoutube />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
