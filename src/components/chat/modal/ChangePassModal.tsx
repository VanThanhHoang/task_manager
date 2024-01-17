import React, { useState } from "react";
import { Alert, Modal, ScrollView} from "react-native";
import { AppHeader } from "../header/AppHeader";
import { useTheme } from "../../hooks";
import { AppButton } from "../button/AppButton";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { offLoading, showLoading } from "../../Redux/slices";
import AxiosInstance from "../../Utils/AxiosInstance";
import { AppTextInput } from "../../Screens/text_input/AppTextInput";
import { ResidentInfo } from "../../global";

type AddPaymentModalProps = {
  visible: boolean,
  hide: () => void,
}
const ChangePassModal = ({ visible, hide }: AddPaymentModalProps) => {
  const { user } = useAppSelector(state => {
    return state.root.user;
  }) as { user: ResidentInfo };
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [reNewPassword, setReNewPassword] = useState<string>("");
  const { colors } = useTheme();
  const validatePassword = () => {
    if (oldPassword.length == 0) {
      Alert.alert("Mật khẩu cũ không được để trống");
      return false;
    }
    if (newPassword.length == 0) {
      Alert.alert("Mật khẩu mới không được để trống");
      return false;
    }
    if (reNewPassword.length == 0) {
      Alert.alert("Vui lòng nhập lại mật khẩu mới");
      return false;
    }
    if (reNewPassword != newPassword) {
      Alert.alert("Mật khẩu mới không trùng khớp");
      return false;
    }
    return true;
  };
  return <Modal
    transparent
    animationType={"slide"}
    visible={visible}
    style={{ flex: 1 }}>
    <AppHeader
      backPress={hide}
      showBackButton
      title={"Đổi mật khẩu"} />
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20
      }}
      style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <AppTextInput
        password
        value={oldPassword}
        onTextChange={setOldPassword}
        placeHolder={"Nhập mật khẩu cũ"}
        label={"Mật khẩu cũ"} />
      <AppTextInput
        password
        value={newPassword}
        onTextChange={setNewPassword}
        placeHolder={"Nhập mật khẩu mới"}
        label={"Mật khẩu mới"} />
      <AppTextInput
        password
        value={reNewPassword}
        onTextChange={setReNewPassword}
        placeHolder={"Nhập lại mật khẩu mới"}
        label={"Xác nhận"} />
      <AppButton label={"Lưu"} onPress={() => {
        if (validatePassword()) {
          dispatch(showLoading());
          AxiosInstance().patch("user/changePassword/"+user.personal_identification_number, {
            "oldPass": oldPassword,
            "newPass": newPassword
          })
            .then((res) => {
              Alert.alert("Thay đổi mật khẩu thành công");
              setNewPassword("");
              setOldPassword("");
              setReNewPassword("");
            })
            .catch((err) => {
              console.log(err)
              Alert.alert("Mật khẩu cũ không hợp lệ");
            }).finally(() => {
            dispatch(offLoading());
          });
        }
      }} />
    </ScrollView>
  </Modal>;
};
;

export default ChangePassModal;
