/**
 * 文档地址 https://redux-toolkit.js.org/
 */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
  preloadedState: {},
  enhancers: []
});

export default store;