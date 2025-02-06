import React from "react";
import styles from "./formError.module.scss"
const FormErrorMessage = ({ error }) => {
  if (!error) return <></>;
  return <span className={styles.errorM}>{error}</span>;
};

export default FormErrorMessage;
