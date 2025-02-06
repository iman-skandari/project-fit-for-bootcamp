import React from "react";
import styles from "./button.module.scss";

const Button = ({
    variant = "primary",
    children,
    onClick,
    className,
    disabled,
    type="submit"
  }) => {
  return (
    <div>
      <button
        className={[styles.button, styles[variant], className].join(" ")}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
