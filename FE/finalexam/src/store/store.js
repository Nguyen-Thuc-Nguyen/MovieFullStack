import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducer/movieReducer'; // Import your combined reducers

const store = configureStore({
    reducer: {
        movie: movieReducer,
    },
});

export default store;