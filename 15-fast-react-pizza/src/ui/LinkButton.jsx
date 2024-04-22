/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LinkButton = ({ children, to }) => {
  const navigate = useNavigate();
  if (to === "-1")
    return (
      <button
        className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    );
  return (
    <Link
      to={to}
      className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
    >
      {children}
    </Link>
  );
};

export default LinkButton;
