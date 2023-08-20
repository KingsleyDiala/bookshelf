import React from "react";
import Books from "../books";
import Footer from "../global/footer";
import Header from "../global/header";
import Hero from "../hero";
import Offer from "../offer";
import Subscribe from "../subscribe";

const BookshelfMinimal = () => {
  return (
    <>
      <Header headers="minimal" />
      <Hero />
      <Offer />
      <Books />
      <Subscribe />
      <Footer />
    </>
  );
};

export default BookshelfMinimal;
