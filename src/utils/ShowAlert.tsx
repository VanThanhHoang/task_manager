import { Alert } from "react-native";
export const showAlert = (title:string,msg:string,onConfirmPress:()=>void) => {
  Alert.alert(
    title || 'Thông báo',
    msg,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress:onConfirmPress,
      },
    ],
    { cancelable: false }
  );
};
