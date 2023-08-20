import { Link } from "react-router-dom";
import Header from "../global/header";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import Footer from "../global/footer";
import { useAllContext } from "../context/context";
import Pagination from "../pagination";
import { useState } from "react";

const ManageBooks = ({
  setCart,
  handleChange,
  price,
  handleRemove,
  setQuery,
}) => {
  const { allBooks } = useAllContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastBook = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastBook - postsPerPage;
  const currentBooks = allBooks.slice(indexOfFirstPost, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteBook = async (id) => {
    try {
      Swal.fire({
        icon: "success",
        text: "Book delete successfully",
      });
      await deleteDoc(doc(db, "books", id));
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: { err },
      });
    }
  };

  return (
    <>
      <Header headers="manage-book" />
      <section className="section-padding manege-book">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive bs-scroll">
                <table className="table border">
                  <thead>
                    <tr>
                      <th>Images</th>
                      <th>Book Name</th>
                      <th>Price</th>
                      <th>Update</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBooks.map((allBook) => (
                      <tr key={allBook.id}>
                        <td>
                          <img
                            className="img-fluid"
                            src={allBook.img}
                            alt={allBook.title}
                          />
                        </td>
                        <td>
                          <span>{allBook.title}</span>
                        </td>
                        <td>
                          {parseInt(allBook.price) === allBook.offerPrice ? (
                            <>
                              <span>${allBook.price}</span>
                            </>
                          ) : (
                            <>
                              <del>${allBook.price}</del>{" "}
                              <span>${allBook.offerPrice}</span>
                            </>
                          )}
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
                            <RiDeleteBin6Line />
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
