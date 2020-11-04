/**
 * reduxjs工具集
 * 使用 createSlice 简化reducer的创建
 */
import { createSlice } from '@reduxjs/toolkit';

export const {
  reducer: counterReducer,
  actions: counterActions
} = createSlice({
  // 名称
  name: 'counter',
  // 初始值
  initialState: 0,
  //
  reducers: {
    // {type: 'counter/increment'}
    increment: (state) => state + 1,
  }
});