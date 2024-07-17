import { Formik } from "formik";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BookList from "../../components/BookList";

export default function BookDetailsPage() {
  const [booksList, setBooksList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  function handleEditClick(id) {
    setEditingId(id);
  }

  function handleDeleteClick(id) {
    const updatedData = booksList.filter((item) => item.id !== id);
    setBooksList(updatedData);
  }

  return (
    <>
      <div className="container">
        <Formik
          initialValues={
            editingId !== null
              ? booksList.find((item) => item.id === editingId) || {
                  id: "",
                  title: "",
                  author: "",
                  isbnNumber: "",
                  publication: "",
                }
              : {
                  id: "",
                  title: "",
                  author: "",
                  isbnNumber: "",
                  publication: "",
                }
          }
          validate={(value) => {
            let errors = {};
            if (!value.title) {
              errors.title = "Title is required";
            }
            else if (!value.author) {
              errors.author = "Author is required";
            }
            else if (!value.isbnNumber) {
              errors.isbnNumber = "ISBN Number is required";
            }
            else if (!value.publication) {
              errors.publication = "Publication is required";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            if (editingId !== null) {
              const booksListCopy = booksList.map((item) =>
                item.id === editingId ? { ...values, id: editingId } : item
              );
              setBooksList(booksListCopy);
              setEditingId(null);
            } else {
              setBooksList([...booksList, { ...values, id: uuidv4() }]);
            }
            resetForm();
          }}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, handleSubmit , errors }) => (
            <form onSubmit={handleSubmit}>
              <div className="row mt-3 d-flex align-items-center justify-content-center gap-2">
                <div className="col-md-12 my-2">
                  <div className="fs-4">Books Page</div>
                </div>
                <div className="col">
                  <label htmlFor="title" className="form-label mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && <div className="text-danger">{errors.title}</div>}
                </div>
                <div className="col">
                  <label htmlFor="author" className="form-label mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    placeholder="Author Name"
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.author && <div className="text-danger">{errors.author}</div>}
                </div>
                <div className="col">
                  <label htmlFor="isbnNumber" className="form-label mb-2">
                    ISBN Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="isbnNumber"
                    name="isbnNumber"
                    placeholder="ISBN Number"
                    value={values.isbnNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.isbnNumber && <div className="text-danger">{errors.isbnNumber}</div>}
                </div>
                <div className="col">
                  <label htmlFor="publication" className="form-label mb-2">
                    Publication date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="publication"
                    name="publication"
                    placeholder="publication"
                    value={values.publication}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.publication && <div className="text-danger">{errors.publication}</div>}
                </div>
              </div>
              <div className="col-md-12">
                <button type="submit" className="btn btn-success w-100 my-2">
                  {editingId !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="col-md-12 d-flex flex-column align-items-center justify-content-between">
        {booksList.map((item) => (
          <div className="col-md-12 border mb-3" key={item.id}>
            <BookList
              item={item}
              handleDeleteClick={() => handleDeleteClick(item.id)}
              handleEditClick={() => handleEditClick(item.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
