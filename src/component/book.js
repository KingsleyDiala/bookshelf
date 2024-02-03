import React from "react";

const Bookv3 = ({ book }) => {

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="books__book">
        <a href={`/books/${book?.id}`} >
          <img
            className="img-fluid"
            style={{ cursor: "pointer" }}
            src={book.url}
            alt={book.title}
          />
        </a>
        <div className="books__book__bottom">
          <h3
            className="books__book__bottom--title"
            style={{ marginBottom: "10px" }}
          >
            {book.title}
          </h3>
          <p className="books__book__bottom--subtitle">
            {book.subtitle.substring(0, 130)}...
          </p>
          <p
            className="books__book__bottom--author"
            style={{ marginBottom: "10px", marginTop: "20px" }}
          >
            Von: <span>{book.author}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bookv3;
