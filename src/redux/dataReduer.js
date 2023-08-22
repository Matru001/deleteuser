import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const handleSearchData = createAsyncThunk(
  'managerData',
  async (search) => {
    try {
      const response = await axios.get(
        `https://thinkzone.in.net/thinkzone/searchteacher/${search}`
      );
      return response.data;
    } catch (error) {
      console.log('Something happend while fetching data', error);
    }
  }
);

export const handleDeleteData = createAsyncThunk('deleteRecord', async (id) => {
  const body = {
    userid: id,
    models: ['all'],
  };
  try {
    const response = await axios.post(
      `https://thinkzone.in.net/thinkzone/deleteUserRecord`,
      body
    );
    return response;
  } catch (error) {
    console.log('Something happend while fetching data', error);
  }
});

const initialState = {
  data: [],
};

export const managerDataSlice = createSlice({
  name: 'managerData',
  initialState,
  reducers: {
    fetchManagerData: (state, action) => {
      state.data = action.payload.data;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(handleSearchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(handleDeleteData.fulfilled, (state, action) => {
      console.log('action: ', action.payload);
    });
  },
});

export const { fetchManagerData } = managerDataSlice.actions;

export default managerDataSlice.reducer;
