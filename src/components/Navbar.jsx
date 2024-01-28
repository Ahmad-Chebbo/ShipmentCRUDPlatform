import React from 'react';
import NavbarItem from './NavbarItems';
import logo from '../assets/images/logo.png';
import { faBoxOpen, faSignOut } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ onClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo" className='logo-navbar'/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavbarItem label="Shipments" link="/shipments" icon={faBoxOpen} />
            <NavbarItem label="Logout" icon={faSignOut} onClick={onClick} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
