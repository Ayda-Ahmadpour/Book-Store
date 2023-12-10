import axios from "axios";

const INSERT_BOOK = "./bookstore/bookreducer/INSERT_BOOK";
const DELETE_BOOK = "./bookstore/bookreducer/DELETE_BOOK";
const UPDATE_BOOK = "./bookstore/bookreducer/UPDATE_BOOK";
const BOOK_FAILURE = "./bookstore/bookreducer/BOOK_FAILURE";

const baseUrl =
  "https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps";
const apiKey = "7J88ab57HvQlIbDye75B";

const initialState = [];

export const insertBook = (books) => ({
  type: INSERT_BOOK,
  payload: books,
});

export const getBooks = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/${apiKey}/books`);
    dispatch(insertBook(response.data));
  } catch (err) {
    console.error("Error fetching books:", err);
    dispatch({ type: BOOK_FAILURE, err });
  }
};

export const listBook = (book) => async (dispatch) => {
  try {
    await axios.post(`${baseUrl}/${apiKey}/books`, book);
    dispatch(getBooks());
  } catch (err) {
    console.error("Error listing book:", err);
    dispatch({ type: BOOK_FAILURE, err });
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/${apiKey}/books/${id}`);
    dispatch(getBooks());
  } catch (err) {
    console.error("Error deleting book:", err);
    dispatch({ type: BOOK_FAILURE, err });
  }
};

export const updateBook = (book) => ({
  type: UPDATE_BOOK,
  payload: book,
});

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case INSERT_BOOK: {
      const books = Object.entries(action.payload);
      return books.map((book) => ({
        id: book[0],
        ...book[1][0],
      }));
    }
    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.id);
    case UPDATE_BOOK: {
      return state.map((book) => {
        if (book.id === action.payload.id) {
          return {
            ...book,
            ...action.payload,
          };
        }
        return book;
      });
    }
    default:
      return state;
  }
}
