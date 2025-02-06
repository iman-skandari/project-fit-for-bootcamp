import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from '../../components/MenuItem/index'
import { setBooks } from '../../redux/booksSlice'
import { deleteData, getData } from '../../Services/apiClient/apiClient'
import styles from "./product.module.scss"
import { AuthContext } from '../../context/authContext';
const Products = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector((state) => state.books)
    const { auth } = useContext(AuthContext);
    const handleDelete = async (bookId) => {
        try {
            await deleteData(`/api/books/${bookId}`);
            // بعد از حذف، لیست به‌روزرسانی شود
            const updatedBooks = await getData('/api/books');
            dispatch(setBooks(updatedBooks.data));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getData('/api/books')
                dispatch(setBooks(response.data))
            } catch (error) {
                console.error("Error fetching books:", error)
            }
        }

        fetchBooks()
    }, [dispatch])

    const handleEdit = (bookId) => {
        navigate(`/edit/${bookId}`)
    }

    

     const handleAdd = () => {
        if (!auth?.token) {
            navigate('/login');
            return;
        }
        navigate('/add');
    };

    console.log(data); // بررسی داده‌ها

    return (
        <div className={styles.productContainer}>
            <MenuItem sections={data} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
        </div>
    )
}

export default Products
