import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postData } from "../../Services/apiClient/apiClient";
import styles from "./add.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AddBook = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (!auth?.token) {
      navigate("/login");
      return;
    }

    try {
      const bookData = {
        title: data.title,
        author: data.author,
        publicationYear: parseInt(data.publicationYear),
        isbn: data.isbn
      };

      const response = await postData("/api/books", bookData);
      if (response) {
        navigate("/products");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Add New Book</h2>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Author"
            {...register("author", { required: "Author is required" })}
          />
          {errors.author && <span className={styles.error}>{errors.author.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="number"
            placeholder="Publication Year"
            {...register("publicationYear", { 
              required: "Publication year is required",
              min: { value: 0, message: "Year must be positive" },
              max: { value: 2025, message: "Year cannot be greater than 2025" }
            })}
          />
          {errors.publicationYear && <span className={styles.error}>{errors.publicationYear.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="ISBN"
            {...register("isbn", { required: "ISBN is required" })}
          />
          {errors.isbn && <span className={styles.error}>{errors.isbn.message}</span>}
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;