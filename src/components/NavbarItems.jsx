import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NavbarItem = ({ label, link, icon, onClick }) => {
  if (link) {
    return (
      <li className="navbar-item">
        <Link to={link} className="nav-link">
          {icon && <FontAwesomeIcon icon={icon} className="mx-2" />}
          {label}
        </Link>
      </li>
    );
  } else if (onClick) {
    return (
      <li className="navbar-item">
        <a href="#" onClick={onClick} className="nav-link">
          {icon && <FontAwesomeIcon icon={icon} className="mx-2" />}
          {label}
        </a>
      </li>
    );
  }
  return null;
};

export default NavbarItem;