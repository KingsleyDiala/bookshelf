import React from 'react';
import { useAllContext } from '../context/context';
import { useParams } from "react-router-dom";
import Header from '../global/header';
import Footer from '../global/footer';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  ApolloClient,
  InMemoryCache,
  useMutation
} from "@apollo/client";
import { FaUser } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { PUBLISH_COMMENT, CREATE_NEW_COMMENT, UNPUBLISH_COMMENT } from '../../queries';

const BookDetails = () => {
  const { allBooks, query, myRef, isLoading, allComments, setAllComments } =
    useAllContext();
  const param = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
  });

  // Date options
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Date options
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  // Get book from store
  const book = allBooks.find((book) => book.id === param.id);

  // Get all comments related to book
  const comments = allComments
    ? allComments.filter((comment) => comment.bookId === param.id)
    : [];

  // ======================== ADDING COMMENT ============================
  const [createComment, { error, loading, data }] =
    useMutation(CREATE_NEW_COMMENT);
  const [publishComment] = useMutation(PUBLISH_COMMENT);
  const [unpublishComment] = useMutation(UNPUBLISH_COMMENT);

  const onSubmit = async (formData, e) => {
    const data = {
      author: formData.fullname,
      content: formData.comment,
      bookId: param.id,
    };
    try {
      const { data: createData } = await createComment({
        variables: data,
      });

      // The comment has been successfully created, and you have access to the data.
      const comment = createData.createComment;

      // Step 2: Publish the comment
      const { data: publishData } = await publishComment({
        variables: {
          commentId: comment.id, // Use the ID of the newly created book
        },
      });

      // Add new comment to ui
      setAllComments((prev) => [...prev, createData.createComment]);

      // The comment has been successfully published.
      const publishedComment = publishData.publishComment;

      // You can now execute your code after the book is published, for example:
      Swal.fire({
        icon: "success",
        text: "Kommentar erfolgreich veröffentlicht",
      });

      e.target.reset();
    } catch (error) {
      // Handle any errors that occurred during either mutation
      Swal.fire({
        icon: "error",
        text:
          error.networkError.result.errors[0].message ||
          "Beim Erstellen des Kommentars ist ein Fehler aufgetreten.",
      });
      console.log(error);
    }
  };

  // ============================== DELETE COMMENT =====================
  const promptDelete = (id) => {
    Swal.fire({
      title: "Sind Sie sicher?",
      text: "Kommentar wird gelöscht",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      preConfirm: () => onDelete(id),
    });
  };

  const onDelete = async (id) => {
    try {
      await unpublishComment({ variables: { commentId: id } });

      setAllComments((prev) => prev.filter((comment) => comment.id !== id));

      Swal.fire({
        icon: "success",
        text: "Kommentar erfolgreich gelöscht",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text:
          error.networkError.result.errors[0].message ||
          "Fehler bei der Löschung des Kommentars.",
      });
      console.log(error);
    }
  };

  return (
    <>
      <Header headers="classic" />
      <div style={{ padding: "70px 50px 100px 50px" }} className="cart">
        <div className="row">
          <div className="section-title-center text-center mb-4">
            <h2 className="fs-2">{book?.title}</h2>
            <div className="section-divider divider-triangle"></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          <div
            style={{
              width: "400px",
              height: "auto",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={book?.url}
              alt={book?.title}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <li>
              <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                Titel
              </span>
              : {book?.title}
            </li>
            <li>
              <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                Genres
              </span>
              : {book?.genres}
            </li>
            <li>
              <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                Autor
              </span>
              : {book?.author}
            </li>
            <li>
              <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                Sprache
              </span>
              : {book?.language}
            </li>
            {book?.pages === "" ? (
              ""
            ) : (
              <li>
                <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                  Gesamte Seiten
                </span>
                : {book?.pages}
              </li>
            )}
            <li>
              <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                Herausgeber
              </span>
              : {book?.publisher}
            </li>
            <li>
              <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                Veröffentlicht
              </span>
              : {book?.publish_year}
            </li>
            {book?.isbn === "" ? (
              ""
            ) : (
              <li>
                <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                  ISBN
                </span>
                : {book?.isbn}
              </li>
            )}
            <p
              className="mb-2"
              style={{ maxWidth: "700px", marginTop: "20px" }}
            >
              {" "}
              <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                Beschreibung
              </span>
              : {book?.description}
            </p>
          </ul>
        </div>
        {/* Comments */}
        <div
          style={{
            padding: "100px 0px",
            gap: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form
            className="add-book"
            style={{ maxWidth: "1400px", marginBottom: "40px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4>Kommentar hinzufügen</h4>
            <div className="add-book__input">
              <input
                {...register("fullname", { required: true })}
                id="fullname"
                type="text"
                placeholder="Vollständiger Name"
              />
              {errors.fullname && <p>Vollständiger Name ist erforderlich</p>}

              <textarea
                {...register("comment", { required: true })}
                style={{ height: "200px" }}
                id="comment"
                type="text"
                placeholder="Kommentar"
              />
              {errors.comment && <p>Kommentar ist erforderlich</p>}
            </div>
            <button
              type="submit"
              className="button button__primary"
              style={{ marginTop: "20px" }}
            >
              <span>Kommentar hinzufügen</span>
            </button>
          </form>

          <h3 style={{ marginBottom: "10px" }}>Kommentare</h3>
          {comments?.length > 0 && comments ? (
            comments?.map((comment) => (
              <div
                key={comment.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  maxWidth: "1400px",
                  border: "1px solid rgba(0,0,0,0.3)",
                  padding: "30px",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "10px",
                        background: "lightGrey",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FaUser size={25} />
                    </div>
                    <div>
                      <h6 style={{ margin: 0 }}>{comment?.author}</h6>
                      <p
                        style={{ margin: 0, fontSize: "14px", opacity: "0.6" }}
                      >
                        {new Intl.DateTimeFormat("de-DE", options).format(
                          new Date(comment?.createdAt)
                        )} {"  "}
                        um{" "}
                        {new Intl.DateTimeFormat("de-DE", timeOptions).format(
                          new Date(comment?.createdAt)
                        )}{" "}
                        Uhr
                      </p>
                    </div>
                  </div>
                  <div
                    className="delete_comment_button"
                    onClick={() => promptDelete(comment.id)}
                  >
                    <BsTrash size={25} />
                  </div>
                </div>
                <div>
                  <p>{comment?.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Noch keine Kommentare</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetails;