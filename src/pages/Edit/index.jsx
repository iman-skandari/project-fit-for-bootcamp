import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData, putData } from "../../Services/apiClient/apiClient";
import { useDispatch } from "react-redux";
import { updateBook } from "../../redux/booksSlice";
import styles from "./edit.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const EditPage = () => {
  const { auth } = useContext(AuthContext);
  const { bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publicationYear: "",
    isbn: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getData(`/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!auth?.token) {
      navigate("/login");
      return;
    }
    try {
        const year = parseInt(book.publicationYear);
        if (isNaN(year) || year < 0 || year > 2025) {
            alert("سال انتشار باید بین 0 تا 2025 باشد");
            return;
        }

        const bookData = {
            title: book.title,
            author: book.author,
            publicationYear: year,  // استفاده از مقدار تبدیل شده
            isbn: book.isbn,
            _id: bookId
        };

        console.log("Sending data:", bookData);
        const response = await putData(`/api/books/${bookId}`, bookData);
        if (response) {
            dispatch(updateBook(response));
            navigate("/products");
        }
    } catch (error) {
        console.error("Error details:", error.response?.data);
        if (error.response?.status === 500) {
            if (error.response?.data?.message?.includes("validation")) {
                alert("لطفاً مقادیر ورودی را بررسی کنید");
            } else if (error.response?.data?.message?.includes("token")) {
                navigate("/login");
            }
        }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            placeholder="Title"
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            placeholder="Author"
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={book.publicationYear}
            onChange={(e) =>
              setBook({ ...book, publicationYear: e.target.value })
            }
            placeholder="Publication Year"
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={book.isbn}
            onChange={(e) => setBook({ ...book, isbn: e.target.value })}
            placeholder="ISBN"
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPage;
