import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AddBook from "./component/pages/add-book";
import Login from "./component/pages/login";
import ManageBooks from "./component/pages/manage-book";
import Update from "./component/pages/update";
import Home from "./component/pages/homepage";
import AllBooks from "./component/pages/all-books";
import { useEffect } from "react";
import BookDetails from "./component/pages/book-details";
import FetchBooks from "./api/fetchBooks";
import FetchUser from "./api/fetchUser";
import FetchComments from "./api/fetchComments";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  return (
    <>
      <FetchUser />
      <FetchBooks />
      <FetchComments />
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/login" element={<Login />} />
              <Route path="/manage-book" element={<ManageBooks />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/all-books" element={<AllBooks />} />
              <Route path="/books/:id" element={<BookDetails />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
