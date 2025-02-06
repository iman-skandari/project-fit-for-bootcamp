import React, { forwardRef } from 'react';
import { useState } from "react";
import styles from "./textInput.module.scss";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import FormErrorMessage from "../FormErrorMessage";

const TextInput = forwardRef(({
  label,
  onChange,
  value,
  className,
  placeholder = "",
  type = "text",
  error,
}, ref) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && <label>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          type={showPass ? "text" : type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        {type === "password" && (
          <div className={styles.eyes} onClick={() => setShowPass(!showPass)}>
            {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        )}
      </div>
      <FormErrorMessage error={error} />
    </div>
  );
});

export default TextInput;
