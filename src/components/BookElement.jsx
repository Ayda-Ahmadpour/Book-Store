import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, deleteBook, updateBook } from "../redux/books/booksRedux";

function BookElement() {
  const bookShow = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const clearHandler = (id) => {
    dispatch(deleteBook(id));
  };

  const startEditHandler = (book) => {
    setEditingId(book.id);
    setEditedTitle(book.title);
    setEditedAuthor(book.author);
    setEditedCategory(book.category);
  };

  const cancelEditHandler = () => {
    setEditingId(null);
  };

  const saveEditHandler = () => {
    dispatch(
      updateBook({
        id: editingId,
        title: editedTitle,
        author: editedAuthor,
        category: editedCategory,
      })
    );
    setEditingId(null);
  };

  return (
    <div className="bookList">
      <div className="bookContainer container">
        <div className="row">
          {bookShow.map((book) => (
            <div
              key={book.id}
              className="dynamic--card col-sm-12 col-md-6 col-lg-4"
            >
              {editingId === book.id ? (
                <div className="form-group row d-flex justify-content-center">
                  <div className="col-sm-10 mb-3">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Title"
                      className="form-control"
                    />
                  </div>
                  <div className="col-sm-10 mb-3">
                    <input
                      type="text"
                      value={editedAuthor}
                      onChange={(e) => setEditedAuthor(e.target.value)}
                      placeholder="Price"
                      className="form-control"
                      id="inpuail3"
                    />
                  </div>
                  <div className="col-sm-10 mb-3">
                    <input
                      type="text"
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                      placeholder="Category"
                      className="form-control"
                      id="inputEm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={saveEditHandler}
                    className="progButton"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditHandler}
                    className="clear progButton"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="card-center">
                  <h1 className="bookTitle">{book.title}</h1>
                  <p>{`${book.author} $`}</p>

                  <p>{book.category}</p>
                  <button
                    type="button"
                    className="clear progButton"
                    onClick={() => clearHandler(book.id)}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="progButton"
                    onClick={() => startEditHandler(book)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookElement;
