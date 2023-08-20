import Booksv2 from "../books-v2";
import Footer from "../global/footer";
import Header from "../global/header";
import HeroModern from "../hero-modern";
import Offer from "../offer";
import Subscribe from "../subscribe";

const BookshelfModern = () => {
  return (
    <>
      <Header headers="modern" />
      <HeroModern />
      <Offer />
      <Booksv2 />
      <Subscribe />
      <Footer />
    </>
  );
};

export default BookshelfModern;
