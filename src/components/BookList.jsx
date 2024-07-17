import React from "react";

export default function BookList({ item = {} , handleDeleteClick = () => {} , handleEditClick = () => {} }) {
  return (
    <div className="row" key={item.id}>
      <div className="col-md-12 px-5 py-4 d-flex align-items-end justify-content-center my-3">
        <div className="col-md-8">
          <div className="fs-6"><span className="h6 me-2 mb-2">Book Name : </span>{item.title}</div>
          <div className="fs-6"><span className="h6 me-2 mb-2">Author Name :</span> {item.author}</div>
          <div className="fs-6"><span className="h6 me-2 mb-2">ISBN Number : </span>{item.isbnNumber}</div>
          <div className="fs-6"><span className="h6 me-2 mb-2">Publication Date :</span> {item.publication}</div>
        </div>
        <div className="col-md-4 d-flex gap-2 mb-1">
          <button className="btn btn-success px-4" onClick={() => handleEditClick(item.id)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDeleteClick(item.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
