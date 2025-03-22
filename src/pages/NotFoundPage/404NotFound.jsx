import "./404NotFound.css";

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Not Found!</p>
      <p className="error-description">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <a href="/" className="home-link">
        Go to Homepage
      </a>
    </div>
  );
};


export default NotFound;