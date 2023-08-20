import React from "react";

const Offer = () => {
  return (
    <section className="offer section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-6 mb-4 mb-sm-0">
            <div className="offer__item h-100">
              <div className="row">
                <div className="col-lg-6">
                  <div className="offer__item__image">
                    <img
                      className="img-fluid"
                      src="assets/images/book1.jpg"
                      alt="Siege-Basini (Hardcover)"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="offer__item__content">
                    <span className="badge-text">Sale Up To 15%</span>
                    <h3>Innovation in Education (Hardcover)</h3>
                    <p className="price">
                      Starting at: <span>$65.09</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-6">
            <div className="offer__item h-100">
              <div className="row">
                <div className="col-lg-6">
                  <div className="offer__item__image">
                    <img
                      className="img-fluid"
                      src="assets/images/book2.jpg"
                      alt="Siege-Basini (Hardcover)"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="offer__item__content">
                    <span className="badge-text">Sale up to 10%</span>
                    <h3>Innovation in Education (Hardcover)</h3>
                    <p className="price">
                      Starting at: <span>$50.09</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
