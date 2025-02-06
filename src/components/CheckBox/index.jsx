import styles from "./checkbox.module.scss";

const Checkbox = ({ label, checked, onChange, className }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={className}
      />

      {label && <label>{label}</label>}
    </div>
  );
};

export default Checkbox;
