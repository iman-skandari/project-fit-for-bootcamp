import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.scss";
import { useEffect, useState } from "react";
import { postData } from "../../Services/apiClient/apiClient";

const schema = yup.object().shape({
  firstName: yup.string().required().min(2),
  lastName: yup.string().required().min(2),
  username: yup
    .string()
    .required()
    .min(3)
    .matches(/^[a-zA-Z0-9_]+$/),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),
});

const RegisterPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await postData("/api/auth/register", data);
      console.log("Registration successful:", response.data);
      
      // هدایت به صفحه محصولات پس از ثبت‌نام موفق
      navigate("/products"); // هدایت به صفحه محصولات
    } catch (err) {
      // بررسی نوع خطا و نمایش پیام مناسب
      if (err.response && err.response.data.message === 'User already exists') {
        setError("username", {
          type: "manual",
          message: "این نام کاربری قبلاً استفاده شده است.",
        });
      } else {
        setError("root", {
          type: "manual",
          message: err.message || "خطا در ثبت نام",
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      postData("/api/auth/register")
        .then((res) => {
          console.log("Full Response:", res);
          setData(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Register</h2>

        {errors.root && (
          <div className={styles.error}>{errors.root.message}</div>
        )}

        <div className={styles.inputGroup}>
          <input type="text" placeholder="Name" {...register("firstName")} />
          {errors.firstName && (
            <span className={styles.error}>{errors.firstName.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input type="text" placeholder="LastName" {...register("lastName")} />
          {errors.lastName && (
            <span className={styles.error}>{errors.lastName.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input type="text" placeholder="UserName" {...register("username")} />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="ConfirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          style={{
            marginBottom: "10px",
            width: "140px",
            background: "#000",
            color: "white",
            padding: ".5rem",
            borderRadius: "8px",
            cursor: "pointer",
            outline: "none",
            width: "100%",
          }}
          type="submit"
        >
          Register
        </button>
        <p>
          <span
            style={{
              marginBottom: "10px",
              width: "140px",
              background: "#000",
              color: "white",
              padding: ".5rem",
              borderRadius: "8px",
              cursor: "pointer",
              outline: "none",
              display: "block",
              width: "100%",
            }}
            onClick={() => navigate("/login")}
            className={styles.link}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
