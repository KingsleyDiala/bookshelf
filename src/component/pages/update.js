/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../global/header";
import Footer from "../global/footer";
import { useAllContext } from "../context/context";
import { useMutation } from "@apollo/client";
import { UPDATE_BOOK, PUBLISH_BOOK } from "../../queries";


const Update = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.sessionStorage.getItem("user")) navigate("/login");
  }, []);
  
  const [data, setData] = useState([]);

  const { id } = useParams();
  const { allBooks } = useAllContext();
  const singleData = allBooks.filter((data) => data.id === id);
  const updateData = singleData[0];
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [publishBook] = useMutation(PUBLISH_BOOK);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {...data, id: id}
    
    try {
      const response = await updateBook({ variables: formData });
      
      const updatedBook = response.data.updateBook;

      // Step 2: Publish the book
      await publishBook({
        variables: {
          bookId: updatedBook.id, // Use the ID of the newly created book
        },
      });

      // You can now execute your code after the book is published, for example:
      Swal.fire({
        icon: "success",
        text: "Buch aktualisiert und erfolgreich veröffentlicht",
      });
    }
    catch (error) {
      // Handle any errors that occurred during either mutation
      Swal.fire({
        icon: "error",
        text: error.networkError.result.errors[0].message,
      });

      console.error(
        "Error creating or publishing book:",
        error.networkError.result.errors[0].message
      );
    }
    
  }
  return (
    <>
      <Header headers='classic' />
      <div className="add-book section-padding">
        <div className="container">
          <form>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="add-book__input">
                  <div className="add-book__input--image">
                    <label htmlFor="file" className="mt-0 mb-2">
                      <img className="img-fluid" src={updateData?.url} alt="" />
                    </label>
                  </div>
                  <label htmlFor="title">Buchtitel</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Book Title"
                    defaultValue={updateData?.title}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        title: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="url">Bild</label>
                  <input
                    id="url"
                    type="text"
                    placeholder="Bild url"
                    defaultValue={updateData?.url}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        url: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="subtitle">Buch Untertitel</label>
                  <input
                    id="subtitle"
                    type="text"
                    placeholder="Buch Untertitel"
                    defaultValue={updateData?.subtitle}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        subtitle: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="description">Buchbeschreibung</label>
                  <textarea
                    id="description"
                    rows="4"
                    type="text"
                    placeholder="Buchbeschreibung"
                    defaultValue={updateData?.description}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="add-book__input">
                  <label htmlFor="author">Autor Name</label>
                  <input
                    id="author"
                    type="text"
                    placeholder="Autor Name"
                    defaultValue={updateData?.author}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        author: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="publisher">Herausgeber Name</label>
                  <input
                    id="publisher"
                    type="text"
                    placeholder="Herausgeber Name"
                    defaultValue={updateData?.publisher}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        publisher: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="publishedDate">Veröffentlichtes Datum</label>
                  <input
                    id="publishedDate"
                    type="text"
                    placeholder="Veröffentlichtes Datum"
                    defaultValue={updateData?.publish_year}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        publishedDate: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="genres">Genres</label>
                  <input
                    id="genres"
                    type="text"
                    placeholder="Genres"
                    defaultValue={updateData?.genres}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        genres: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="isbn">ISBN</label>
                  <input
                    id="isbn"
                    type="text"
                    placeholder="ISBN"
                    defaultValue={updateData?.isbn}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        isbn: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="pages">Seitenzahl</label>
                  <input
                    id="pages"
                    type="number"
                    placeholder="Seitenzahl"
                    defaultValue={updateData?.pages}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        pages: parseInt(e.target.value),
                      })
                    }
                  />
                  <label htmlFor="country">Land</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="Land"
                    defaultValue={updateData?.country}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        country: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="language">Sprache</label>
                  <input
                    id="language"
                    type="text"
                    placeholder="Sprache"
                    defaultValue={updateData?.language}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        language: e.target.value,
                      })
                    }
                  />
                  <div className="text-center mt-4">
                    <button
                      className="button button__primary"
                      onClick={(e) => handleSubmit(e)}
                    >
                      <span>Buch aktualisieren</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Update;
