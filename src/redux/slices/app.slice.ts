import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../constant";
import { login } from "../actions/user.action";
import { Alert } from "react-native";
import {
  addPayment,
  addResident,
  deleteResident,
  getAllResident,
  getResident,
  maskPaymentIsPayment, sendNoti
} from "../actions/resident.action";

export type AppSliceSate = {
  isLoading: boolean,
  isHotMode: boolean,
  isLogin: boolean
}
const initialState: AppSliceSate = {
  isLoading: false,
  isHotMode: true,
  isLogin: false
};
export const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState,
  reducers: {
    changeThemeMode: (state) => {
      state.isHotMode = !state.isHotMode;
    },
    offLoading: (state) => {
      state.isLoading = false;
    },
    showLoading: (state) => {
      state.isLoading = true;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
      })
      .addCase(addResident.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addResident.rejected, (state, action) => {
        state.isLoading = false;
        Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm cư dân, số cmnd cư dân đã tồn tại");
      })
      .addCase(addResident.fulfilled, (state, action) => {
        Alert.alert("Thông báo", "Thêm cư dân thành công");
        state.isLoading = false;
      })
      .addCase(getResident.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getResident.rejected, (state, action) => {
        state.isLoading = false;
        Alert.alert("Lỗi", "Có lỗi xảy ra khi lấy thông tin cư dân");
      })
      .addCase(getResident.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addPayment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.isLoading = false;
        Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm khoản thu");
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        Alert.alert("Thông báo", "Thêm khoản thu thành công");
        state.isLoading = false;
      })
      .addCase(maskPaymentIsPayment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(maskPaymentIsPayment.rejected, (state, action) => {
        state.isLoading = false;
        Alert.alert("Lỗi", "");
      })
      .addCase(maskPaymentIsPayment.fulfilled, (state, action) => {
        Alert.alert("Thông báo", "Thành công");
        state.isLoading = false;
      })
      .addCase(deleteResident.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteResident.rejected, (state, action) => {
        state.isLoading = false;
        Alert.alert("Lỗi", "");
      })
      .addCase(deleteResident.fulfilled, (state, action) => {
        Alert.alert("Thông báo", "Thành công");
        state.isLoading = false;
      })
      .addCase(getAllResident.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllResident.rejected, (state, action) => {
        state.isLoading = false;
        Alert.alert("Lỗi", "");
      })
      .addCase(getAllResident.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendNoti.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendNoti.rejected, (state, action) => {
        state.isLoading = false;
        Alert.alert("Lỗi", "");
      })
      .addCase(sendNoti.fulfilled, (state, action) => {
      Alert.alert("Thông báo", "Thành công");
        state.isLoading = false;
      })
});
export const { changeThemeMode, showLoading, offLoading } = appSlice.actions;
