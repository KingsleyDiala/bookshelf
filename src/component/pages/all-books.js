import AllBookSidebar from "../all-book-sidebar";
import Footer from "../global/footer";
import Header from "../global/header";
import AllBookNav from "../all-book-nav";
import BookLists from "../book-lists";

const AllBooks = () => {
  return (
    <>
      <Header headers="all-book" />
      <div className="section-padding all-book">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AllBookSidebar />
            </div>
            <div className="col-md-9">
              <AllBookNav />
              <BookLists />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllBooks;
