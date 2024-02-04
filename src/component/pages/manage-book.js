import { Link } from "react-router-dom";
import Header from "../global/header";
import { RiEditBoxLine } from "react-icons/ri";
import { BsFillArchiveFill } from "react-icons/bs";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import Footer from "../global/footer";
import { useAllContext } from "../context/context";
import Pagination from "../pagination";
import { useEffect, useState } from "react";
import { UNPUBLISH_BOOK } from "../../queries";
import { useFilterContext } from "../context/filter_context";
import { useNavigate } from "react-router-dom";


const ManageBooks = ({
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.sessionStorage.getItem('user')) navigate('/login');
  },[])
  const { allBooks, setAllBooks, myRef } = useAllContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [unpublishBook] = useMutation(UNPUBLISH_BOOK);

  const indexOfLastBook = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastBook - postsPerPage;

  let currentBooks = allBooks && allBooks.slice(indexOfFirstPost, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const deleteBook = async (id) => {
    try {

      const { data } = await unpublishBook({ variables: { bookId: id } });
    
      const filteredBooks = allBooks.filter((book) => book.id !== id);
      setAllBooks(filteredBooks);

      Swal.fire({
        icon: "success",
        text: "Buch erfolgreich archiviert",
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.networkError.result.errors[0].message,
      });
    }
  };

  return (
    <>
      <Header headers="manage-book" />
      <section ref={myRef} className="section-padding manege-book">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive bs-scroll">
                <table className="table border">
                  <thead>
                    <tr>
                      <th>Bilder</th>
                      <th>Buch Name</th>
                      <th>Update</th>
                      <th>Archiviren</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBooks &&
                      currentBooks.map((allBook) => (
                        <tr key={allBook.id}>
                          <td>
                            <img
                              className="img-fluid"
                              src={allBook.url}
                              alt={allBook.title}
                            />
                          </td>
                          <td>
                            <span>{allBook.title}</span>
                          </td>
                          <td>
                            <Link className="icon" to={`/update/${allBook.id}`}>
                              <RiEditBoxLine />
                            </Link>
                          </td>
                          <td>
                            <span
                              className="icon"
                              onClick={() => deleteBook(allBook.id)}
                            >
                              <BsFillArchiveFill />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={allBooks.length}
          paginate={paginate}
        />
      </section>
      <Footer />
    </>
  );
};

export default ManageBooks;
