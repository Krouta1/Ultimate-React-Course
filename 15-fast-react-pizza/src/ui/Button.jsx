/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Button = ({ children, disabled, to }) => {
  if (to)
    return (
      <Link
        to={to}
        className=" inline-block rounded-full bg-yellow-500 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-200 hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-4"
      >
        {children}
      </Link>
    );
  return (
    <button
      disabled={disabled}
      className=" inline-block rounded-full bg-yellow-500 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-200 hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-4"
    >
      {children}
    </button>
  );
};

export default Button;
