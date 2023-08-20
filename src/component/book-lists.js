import BookGridView from "./book-grid-view";
import BookListView from "./book-list-view";
import { useFilterContext } from "./context/filter_context";

const BookLists = () => {
  const { filter_products, grid_view } = useFilterContext();

  if (grid_view === true) {
    return <BookGridView products={filter_products} />;
  }

  if (grid_view === false) {
    return <BookListView products={filter_products} />;
  }
};

export default BookLists;
