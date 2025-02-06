import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
    name: 'books',
    initialState: [],
    reducers: {
        setBooks: (state, action) => {
            return action.payload;
        },
        updateBook: (state, action) => {
            const index = state.findIndex(book => book._id === action.payload._id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteBook: (state, action) => {
            const index = state.filter(book => book._id !== action.payload._id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        // سایر ریدوسرها مانند deleteBook و addBook را نیز می‌توانید اضافه کنید
    },
});

export const { setBooks, updateBook,deleteBook } = booksSlice.actions;
export default booksSlice.reducer; 