import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../global/header";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../global/footer";
import { ProgressBar } from "react-bootstrap";
import { CREATE_NEW_BOOK, PUBLISH_BOOK } from "../../queries";
import { useMutation } from "@apollo/client";
import { useAllContext } from "../context/context";


const AddBook = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!window.sessionStorage.getItem("user")) navigate("/login");
  }, []);

  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(null);

  const { setIsLoading } = useAllContext();
  
  const [createBook, {error, loading, data}] = useMutation(CREATE_NEW_BOOK);
  const [publishBook] = useMutation(PUBLISH_BOOK);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (formData, e) => {

    const parsedData = {
      author: formData.author,
      language: formData.language,
      publisher: formData.publisher,
      publish_year: formData.publishedDate, // Parse as integer
      subtitle: formData.subtitle,
      genres: [formData.genres],
      description: formData.description,
      pages: parseInt(formData.pages), // Parse as integer
      price: parseFloat(formData.price), // Parse as float
      isbn: formData.isbn,
      shelf_number: parseInt(formData.shelf_number),
      title: formData.title,
      url: formData.url,
      offer: parseFloat(formData.offer), // Parse as float
      country: formData.country,
      id: '2938nk5nt0gvn24fnf92n42v9234nv92'
    };
    
    try {
      const { data: createData } = await createBook({ variables: parsedData });

      // The book has been successfully created, and you have access to the data.
      const newBook = createData.createBook;

      // Step 2: Publish the book
      const { data: publishData } = await publishBook({
        variables: {
          bookId: newBook.id, // Use the ID of the newly created book
        },
      });

      // The book has been successfully published.
      const publishedBook = publishData.publishBook;

      // You can now execute your code after the book is published, for example:
      Swal.fire({
        icon: "success",
        text: "Book added und Published successfully",
      });

      setTimeout(() => {
        navigate("/all-books");
      }, 1000)

    } catch (error) {
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

    e.target.reset();
  }


  return (
    <>
      <Header headers="add-book" />
      <div className="add-book section-padding">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="add-book__input">
                  <div className="add-book__input--image">
                    <label htmlFor="file" className="mt-0 mb-2">
                      <img
                        className="img-fluid"
                        src={
                          file
                            ? file
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                    </label>
                    {perc !== null ? (
                      <ProgressBar
                        now={Math.round(perc)}
                        label={`${Math.round(perc)}%`}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <label htmlFor="title">Buch Titel</label>
                  <input
                    {...register("title", { required: true })}
                    id="title"
                    type="text"
                    placeholder="Buch Titel"
                  />
                  {errors.title && <p>Titel ist erforderlich</p>}
                  <label htmlFor="title">Bild Url</label>
                  <input
                    {...register("url", { required: false })}
                    id="url"
                    type="text"
                    placeholder="Bild Url"
                    onChange={(e) => setFile(e.target.value)}
                  />
                  {errors.url && <p>Bild ist erforderlich</p>}
                  <label htmlFor="subtitle">Buch Untertitel</label>
                  <input
                    {...register("subtitle", { required: false })}
                    id="subtitle"
                    type="text"
                    placeholder="Buch Untertitel"
                  />
                  {errors.subtitle && <p>Untertitel ist erforderlich</p>}
                  <label htmlFor="description">Buchbeschreibung</label>
                  <textarea
                    {...register("description", { required: false })}
                    id="description"
                    rows="4"
                    type="text"
                    placeholder="Buchbeschreibung"
                  />
                  {errors.description && <p>Beschreibung ist erforderlich</p>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="add-book__input">
                  <label htmlFor="author">Autor Name</label>
                  <input
                    {...register("author", { required: true })}
                    id="author"
                    type="text"
                    placeholder="Autor Name"
                  />
                  {errors.author && <p>Autor ist erforderlich</p>}
                  <label htmlFor="publisher">Herausgeber Name</label>
                  <input
                    {...register("publisher")}
                    id="publisher"
                    type="text"
                    placeholder="Herausgeber Name"
                  />
                  <label htmlFor="publishedDate">Veröffentlicht am</label>
                  <input
                    {...register("publishedDate", { required: false })}
                    id="publishedDate"
                    type="year"
                    placeholder="Veröffentlicht am"
                  />
                  {errors.publishedDate && (
                    <p>Veröffentlichungsdatum ist erforderlich</p>
                  )}
                  <label htmlFor="genres">Genres</label>
                  <input
                    {...register("genres", { required: false })}
                    id="genres"
                    type="text"
                    placeholder="Genres"
                  />
                  {errors.category && <p>Genre ist erforderlich</p>}
                  <label htmlFor="isbn">ISBN</label>
                  <input
                    {...register("isbn")}
                    id="isbn"
                    type="text"
                    placeholder="ISBN"
                  />
                  <label htmlFor="shelf_number">Regalnummer</label>
                  <input
                    {...register("shelf_number")}
                    id="shelf_number"
                    type="number"
                    placeholder="Regalnummber"
                  />
                  <label htmlFor="pages">Seitenzahl</label>
                  <input
                    {...register("pages")}
                    id="pages"
                    type="number"
                    placeholder="Seitenzahl"
                  />
                  <label htmlFor="country">Land</label>
                  <input
                    {...register("country", { required: false })}
                    id="country"
                    type="text"
                    placeholder="Land"
                  />
                  {errors.country && <p>Land ist erforderlich</p>}
                  <label htmlFor="language">Sprache</label>
                  <input
                    {...register("language", { required: false })}
                    id="language"
                    type="text"
                    placeholder="Sprache"
                  />
                  {errors.language && <p>Sprache ist erforderlich</p>}

                  <div className="text-center mt-4">
                    <button
                      disabled={perc !== null && perc < 100}
                      type="submit"
                      className="button button__primary"
                    >
                      <span>Buch hinzufügen</span>
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

export default AddBook;
