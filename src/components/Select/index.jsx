import { forwardRef } from "react";
import styles from "./select.module.scss";

const Select = forwardRef(
  ({ label, options, value, onChange, className }, ref) => {
    return (
      <div className={`${styles.selectContainer} ${className}`}>
        {label && <label>{label}</label>}

        <select ref={ref} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
