import React from "react";
import styles from "./layout.module.scss";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import logo from "../../assets/logo.png"
const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar img={logo} />
      <Outlet />
    </div>
  );
};

export default Layout;