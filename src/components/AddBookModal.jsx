import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { listBook } from "../redux/books/booksRedux";

const AddbookForm = () => {
  const initialState = {
    item_id: "",
    title: "",
    author: "",
    category: "",
  };

  const [bookliststate, setBooklistState] = useState(initialState);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const dispatch = useDispatch();

  const handleEvent = (event) => {
    const { name, value } = event.target;
    setBooklistState({ ...bookliststate, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const book = { ...bookliststate, item_id: uuid() };
    dispatch(listBook(book));
    setBooklistState(initialState);
    setIsPopupVisible(false);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="addcontainer">
      <button type="button" onClick={togglePopup}>
        Add New Book
      </button>

      {isPopupVisible && (
        <div className="popup">
          <span className="ListBook">ADD NEW BOOK</span>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="title booktitle"
              type="text"
              name="title"
              value={bookliststate.title}
              placeholder="Book Title"
              onChange={handleEvent}
            />
            <input
              className="author"
              type="text"
              name="author"
              value={bookliststate.author}
              placeholder="Author"
              onChange={handleEvent}
            />
            <select
              name="category"
              className="categorytitle input-category"
              onChange={handleEvent}
            >
              <option value="">Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Horror">Suspense</option>
              <option value="Religious">Religious</option>
              <option value="Romance">Romance</option>
            </select>
            <button type="submit" className="submit">
              Add book
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddbookForm;
