import { useAllContext } from "./context/context";

const HeroClassic = () => {
  const { executeScroll, setQuery } = useAllContext();
  return (
    <div className="hero-classic">
      <img src="assets/images/hero-classic.jpg" alt="hero" />
      <div className="hero-classic__content">
        <div className="container">
          <h1 className="display-4 mb-4 text-capitalize">
            There Is No Friend As Loyal As A Book
          </h1>
          <p className="mb-5 fs-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad harum
            quibusdam, assumenda quia explicabo.
          </p>
          <input
            type="text"
            placeholder="Search your favorite book"
            onClick={(e) => executeScroll()}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroClassic;
