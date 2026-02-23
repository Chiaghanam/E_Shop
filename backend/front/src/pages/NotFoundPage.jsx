import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3 text-secondary">Oops! Page Not Found</h2>
      <p className="lead mb-4">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg shadow">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
