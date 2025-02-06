import React from "react";
// import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import styles from "../main/layout.module.scss";
import logo from "../../assets/logo.png"
const PrivateLayout = () => {


  return (
    <div className={styles.layout}>
      <Navbar img={logo} />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
