import React from "react";
import { Link } from "react-router";

const NavLink = ({ url = "", title = "" }) => {
  return (
    <li>
      <Link
        to={url}
        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        {title}
      </Link>
    </li>
  );
};

export default NavLink;
