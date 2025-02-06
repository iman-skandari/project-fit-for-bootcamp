import React from "react";
import styles from "./navbar.module.scss";
import Button from "../Button/index";
import { Link, NavLink } from "react-router-dom";
const Navbar = ({ img }) => {
  return (
    <main className={styles.containers}>
      <div className={styles.logoNavbar}>
        <img src={img} />
      </div>

      <div className={styles.titleNav}>
        <ul className={styles.titleNavList}>
          <NavLink className={styles.navLink} to="/">
            <li>
              <h2>Home</h2>
            </li>
          </NavLink>
          <NavLink className={styles.navLink} to="/products">
          <li>
            <h2>Products</h2>
          </li>
          </NavLink>
          <NavLink className={styles.navLink} to="/about-us">
            <li>
              <h2>About Us</h2>
            </li>
          </NavLink>
        </ul>
      </div>

      <div className={styles.buttonNav}>
        <Link to="/login" >
        <Button variant="primary">Login</Button>
        </Link>
      </div>
    </main>
  );
};

export default Navbar;
