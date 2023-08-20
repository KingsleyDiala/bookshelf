import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import Header from "../global/header";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../global/footer";
import { ProgressBar } from "react-bootstrap";

const AddBook = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [image, setImage] = useState({});
  const [perc, setPerc] = useState(null);
  console.log(perc);
  console.log(image);
  useEffect(() => {
    const uploadFile = (e) => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          Swal.fire({
            icon: "error",
            text:  error.message ,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    try {
      await addDoc(collection(db, "books"), {
        ...data,
        ...image,
        offer: "0",
        offerPrice: data.price,
        timeStamp: serverTimestamp(),
      });
      Swal.fire({
        icon: "success",
        text: "Book add successfully",
      });
      navigate("/all-books");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: { err },
      });
    }
    e.target.reset();
  };
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
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      <img
                        className="img-fluid"
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                    </label>
                    {perc !== null ? (
                      <ProgressBar now={Math.round(perc)} label={`${Math.round(perc)}%`} />
                    ) : (
                      ""
                    )}
                  </div>
                  <label htmlFor="title">Book Title</label>
                  <input
                    {...register("title", { required: true })}
                    id="title"
                    type="text"
                    placeholder="Book Title"
                  />
                  {errors.title && <p>Title is required</p>}
                  <label htmlFor="subtitle">Book Subtitle</label>
                  <input
                    {...register("subtitle", { required: true })}
                    id="subtitle"
                    type="text"
                    placeholder="Book Subtitle"
                  />
                  {errors.subtitle && <p>Subtitle is required</p>}
                  <label htmlFor="desc">Book Description</label>
                  <textarea
                    {...register("desc", { required: true })}
                    id="desc"
                    rows="4"
                    type="text"
                    placeholder="Book Description"
                  />
                  {errors.description && <p>Description is required</p>}
                  <label htmlFor="author">Author Name</label>
                  <input
                    {...register("author", { required: true })}
                    id="author"
                    type="text"
                    placeholder="Author Name"
                  />
                  {errors.author && <p>Author is required</p>}
                  <label htmlFor="publisher">Publisher Name</label>
                  <input
                    {...register("publisher")}
                    id="publisher"
                    type="text"
                    placeholder="Publisher Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="add-book__input">
                  <label htmlFor="publishedDate">Published Date</label>
                  <input
                    {...register("publishedDate", { required: true })}
                    id="publishedDate"
                    type="date"
                    placeholder="Published Date"
                  />
                  {errors.publishedDate && <p>Publish Date is required</p>}
                  <label htmlFor="category">Category</label>
                  <input
                    {...register("category", { required: true })}
                    id="category"
                    type="text"
                    placeholder="Category"
                  />
                  {errors.category && <p>Category is required</p>}
                  <label htmlFor="isbn">ISBN</label>
                  <input
                    {...register("isbn")}
                    id="isbn"
                    type="text"
                    placeholder="ISBN"
                  />
                  <label htmlFor="pages">Number of pages</label>
                  <input
                    {...register("pages")}
                    id="pages"
                    type="number"
                    placeholder="Pages"
                  />
                  <label htmlFor="country">Country</label>
                  <input
                    {...register("country", { required: true })}
                    id="country"
                    type="text"
                    placeholder="Country"
                  />
                  {errors.country && <p>Country is required</p>}
                  <label htmlFor="language">Language</label>
                  <input
                    {...register("language", { required: true })}
                    id="language"
                    type="text"
                    placeholder="Language"
                  />
                  {errors.language && <p>Language is required</p>}
                  <label htmlFor="price">Price</label>
                  <input
                    {...register("price", { required: true })}
                    id="price"
                    type="text"
                    placeholder="Price"
                  />
                  {errors.price && <p>Price is required</p>}
                  <div className="text-center mt-4">
                    <button
                      disabled={perc !== null && perc < 100}
                      type="submit"
                      className="button button__primary"
                    >
                      <span>Add Book</span>
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
