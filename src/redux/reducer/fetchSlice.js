/**
 * 使用 createAsyncThunk
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import store from '@/redux/store';

const fetchUserById = createAsyncThunk(
  'fetch/user',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch('/a');
      return response.data;
    } catch (err) {
      return err.error;
    }
  }
);


export const {
  reducer: fetchReducer,
  actions: fetchActions
} = createSlice({
  // 名称
  name: 'fetch',
  // 初始值
  initialState: {userId: '', loading: false, error: null},
  //
  reducers: {
    // {type: 'counter/increment'}
    // increment: (state) => state + 1,
  },
  // 外部reducers
  extraReducers: {
    [fetchUserById]: (state, action) => {
      state.loading = true;
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.loading = true;
      state.userId = action.meta.arg;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.loading = true;
      state.userId = action.meta.arg;
    }
  }
});


// setInterval(function () {
//   store.dispatch(fetchUserById(new Date().toLocaleTimeString()));
// }, 1000);
