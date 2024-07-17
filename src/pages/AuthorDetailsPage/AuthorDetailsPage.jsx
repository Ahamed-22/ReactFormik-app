import React, { useState } from "react";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import AuthorList from "../../components/AuthorList.jsx";

export default function AuthorDetailsPage() {
  const [authorDetails, setAuthorDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);

  function handleEditClick(id) {
    setEditingId(id);
  }

  function handleDeleteClick(id) {
    const updatedAuthorDetails = authorDetails.filter((item) => item.id !== id);
    setAuthorDetails(updatedAuthorDetails);
  }

  return (
    <div className="container">
      <div className="row my-3">
        <Formik
          initialValues={
            editingId !== null
              ? authorDetails.find((item) => item.id === editingId) || {
                  id: "",
                  authorName: "",
                  birthDate: "",
                  bioGraphy: "",
                }
              : { id: "", authorName: "", birthDate: "", bioGraphy: "" }
          }
          validate={(value) => {
            const errors = {};
            if (!value.authorName) {
              errors.authorName = "Required";
            }
            if (!value.birthDate) {
              errors.birthDate = "Required";
            }
            if (!value.bioGraphy) {
              errors.bioGraphy = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            if (editingId !== null) {
              const updatedAuthorDetails = authorDetails.map((item) =>
                item.id === editingId ? { ...values, id: editingId } : item
              );
              setAuthorDetails(updatedAuthorDetails);
              setEditingId(null);
            } else {
              setAuthorDetails([...authorDetails, { ...values, id: uuidv4() }]);
            }
            resetForm();
          }}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, handleSubmit , errors }) => (
            <form>
              {/* user form */}
              <h4 className="fs-4 mb-4">Author Details</h4>
              <div class="mb-3">
                <label htmlFor="authorName" className="form-label">
                  Author Name
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="authorName"
                  name="authorName"
                  placeholder="Author Name"
                  value={values.authorName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.authorName && <p className="text-danger">{errors.authorName}</p>}
              </div>
              <div class="mb-3">
                <label htmlFor="birthDate" className="form-label">
                  birth Date
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Birth Date"
                  value={values.birthDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.birthDate && <p className="text-danger">{errors.birthDate}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="bioGraphy" className="form-label">
                  Biography
                </label>
                <textarea
                  className="form-control"
                  id="bioGraphy"
                  name="bioGraphy"
                  rows="3"
                  value={values.bioGraphy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="bioGraphy"
                ></textarea>
                {errors.bioGraphy && <p className="text-danger">{errors.bioGraphy}</p>}
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                {editingId ? "Update" : "Submit"}
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div className="col-md-12">
        {authorDetails.map((item) => (
          <div className="row border mb-2" key={item.id}>
            <AuthorList
              item={item}
              handleEditClick={() => handleEditClick(item.id)}
              handleDeleteClick={() => handleDeleteClick(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
