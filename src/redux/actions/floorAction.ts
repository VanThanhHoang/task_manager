import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/AxiosInstance";

export const getFloor = createAsyncThunk("room/getFloor", async (_, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance().get('room/getFloor');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
