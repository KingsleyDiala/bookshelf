import React from "react";
import Booksv3 from "../books-v3";
import Footer from "../global/footer";
import Header from "../global/header";
import HeroClassic from "../hero-classic";
import Subscribe from "../subscribe";

const BookshelfClassic = () => {
  return (
    <>
      <Header headers="classic" />
      <HeroClassic />
      <Booksv3 />
      <Subscribe />
      <Footer />
    </>
  );
};

export default BookshelfClassic;
