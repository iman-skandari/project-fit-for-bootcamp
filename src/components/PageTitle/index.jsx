import React from "react";
import styles from "./pageTitle.module.scss";
const PageTitle = ({ title }) => {
  return <div className={styles.pageTitle}>{title}</div>;
};

export default PageTitle;
