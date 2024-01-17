import {ResidentInfo, User} from "../../global";
import { localStorage } from "../../utils/storage";
import { Alert } from "react-native";
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../constant";
import { login } from "../actions/user.action";


export type UserSliceState = {
  user: User | null
}
const initialState: UserSliceState = {
  user: null
};
export const userSlice = createSlice({
  name: SLICE_NAME.USER,
  initialState,
  reducers: {
    updateNoti: (state, action) => {

    },
    updateUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    getNoti: (state, action) => {

    }
  },
  extraReducers: builder =>
    builder
      .addCase(login.pending, (state, action) => {

      })
      .addCase(login.rejected, (state, action) => {
        Alert.alert("Đăng nhập thất bại", "Tài khoản hoặc mất khẩu không đúng hoặc không còn được phép sử dụng");
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload
        localStorage.set("token", user.id);
        state.user = user;
      })
});
export const { updateNoti ,updateUser,getNoti} = userSlice.actions;
