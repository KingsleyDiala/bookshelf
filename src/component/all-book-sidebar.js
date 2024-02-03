import { useAllContext } from "./context/context";
import { useFilterContext } from "./context/filter_context";

const AllBookSidebar = () => {
  const { allBooks } = useAllContext();

  // TO GET THE UNIQUE DATA OF EACH FIELDS
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    return (newVal = ["Alle", ...new Set(newVal)]);
  };

  // WE NEED UNIQUE DATA
  const categoryData = getUniqueData(allBooks, "category");

  const {
    filters: { text, category },
    updateFilterValue,
  } = useFilterContext();
  return (
    <div className="filter">
      <div className="filter__item">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Suche"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>
      <div className="filter__item">
        <h3 className="filter--title">Genre</h3>
        <div className="filter__item--category">
          {categoryData.map((curElem, i) => {
            return (
              <button
                key={i}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={updateFilterValue}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllBookSidebar;
