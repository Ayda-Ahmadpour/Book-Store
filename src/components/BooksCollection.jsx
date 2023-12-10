import BookElement from "./BookElement";
import AddNewBook from "./AddNewBook";

function BooksCollection() {
  return (
    <div className="CreamyBackground">
      <div>
        <AddNewBook />
      </div>
      <div>
        <BookElement />
      </div>
    </div>
  );
}

export default BooksCollection;
