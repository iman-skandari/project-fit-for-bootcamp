import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import * as Yup from "yup";
import styles from "./login.module.scss";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../components/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../Services/apiClient/apiClient";

const validationSchema = Yup.object({
  username: Yup.string().required().min(3),
  password: Yup.string().required().min(4).max(13),
  // email: Yup.string().required().email(),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postData('/api/auth/login', data);
      console.log("Response:", response);
      localStorage.setItem('token', response.data.token);
      navigate('/products');
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: 'Invalid username or password'
      });
    }
  };
  console.log(errors);

  return (
    <div className={styles.containerLogin}>
      <div>
        <h1>Login</h1>
      </div>

      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="username">UserName</label>
        <input {...register("username")} id="username" type="text" /> */}

        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              {...field}
              label="username"
              error={errors.username?.message}
            />
          )}
        />
        {/* {errors.username && (
          <span className={styles.errorMessage}>{errors.username.message}</span>
        )} */}

        {/* <label htmlFor="password">Password</label>
        <input {...register("password")} id="password" type="password" /> */}
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              {...field}
              label="password"
              error={errors.password?.message}
            />
          )}
        />

        {/* {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )} */}

        {/* <label htmlFor="email">Email</label>
        <input {...register("email")} id="email" type="email" /> */}

        {/* <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput {...field} label="email" error={errors.email?.message} />
          )}
        /> */}

        {/* {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )} */}
        <div className={styles.buttonLogin}>
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
            }}
            type="submit"
          >
            Submit
          </button>
          <Link to="/register">
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
            }}
            type="submit"
          >
            Register
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
