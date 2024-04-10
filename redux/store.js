import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './slice/todosSlice';

export const store = configureStore({
	reducer: {
		todos: todosSlice,
	},
});
