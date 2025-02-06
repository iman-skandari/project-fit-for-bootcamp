import styles from "./home.module.scss";

import { useEffect, useState } from "react";
import { getData } from "../../Services/apiClient/apiClient";
import MenuItem from "../../components/MenuItem";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.menuContainer}>
      برای نمایش کتاب ها لطفا <Link style={{color:"blue",textDecoration:"none"}} to="/login"><span>Login</span></Link> کنید
    </div>
  );
};

export default HomePage;
