import React, { useEffect } from "react";
import {
  Image,
  Modal,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from "../../hooks";
import { Linking } from "react-native";
import { AppHeader } from "../header/AppHeader";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopy, faLocationDot, faMessage, faPhone, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import Clipboard from "@react-native-clipboard/clipboard";
import { AppTextInput } from "../../Screens/text_input/AppTextInput";
import { ResidentInfo } from "../../global";
import { getResident } from "../../Redux/actions/resident.action";
import { useAppDispatch } from "../../Redux/store";

type ResidentModalProps = {
  visible: boolean,
  hideModal: () => void
}
export const AdminInfoModal = ({ ...props }: ResidentModalProps) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [adminInfo, setAdminInfo] = React.useState<ResidentInfo>()
  useEffect(() => {
   dispatch(getResident('admin')).then((res: any) => {
      if (!res.error) {
        setAdminInfo(res.payload.user);
      }
    });
  },[]);
  return <Modal
    animationType={"slide"}
    visible={props.visible}
    style={{ flex: 1 }}>
    <StatusBar translucent />
    <AppHeader
      showBackButton
      backPress={props.hideModal}
      title={"Thông tin chủ nhà"} />
    <View style={{ flex: 1, padding: 16, gap: 24,backgroundColor:colors.background }}>
      {adminInfo &&  <View style={ {
        flex: 1,
        padding: 16
      }}>
        <AppTextInput
          disable
          value={adminInfo?.fullName}
          placeHolder={"Nhập tên của bạn..."}
          label={"Tên"} />
        <AppTextInput
          disable
          value={adminInfo?.phone_number}
          placeHolder={"Nhập số điện thoại của bạn..."}
          label={"Sô điện thoại"} />
        <AppTextInput
          disable
          value={adminInfo.email}
          placeHolder={"Nhập email của bạn..."}
          label={"Email"} />
        <AppTextInput
          disable
          value={adminInfo.permanent_address}
          placeHolder={"Nhập địa chỉ"}
          label={"Địa chỉ"} />
      </View>}
    </View>
  </Modal>;
};
