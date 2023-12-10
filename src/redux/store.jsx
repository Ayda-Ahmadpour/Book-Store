import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import bookReducer from "./books/booksRedux";

const rootReducer = combineReducers({
  books: bookReducer,
});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

export default store;
