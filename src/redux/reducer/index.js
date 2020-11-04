/**
 * 定义rootReducer
 */
import { combineReducers } from '@reduxjs/toolkit';

import {counterReducer} from './counterSlice';
import {fetchReducer} from './fetchSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: fetchReducer
});

export default rootReducer;
