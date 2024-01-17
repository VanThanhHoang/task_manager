import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { localStorage } from "../../utils/storage";

interface LoginPayload {
  userName: string;
  password: string;
}

export const login = createAsyncThunk("user/login", async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    console.log("**** ",localStorage.getString("FCM"))
    const response = await axiosInstance().post("user/login", {
      email: payload.userName,
      password: payload.password,
      fcm:localStorage.getString("FCM")
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error);
  }
});



