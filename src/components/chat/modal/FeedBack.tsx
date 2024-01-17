import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import { offLoading, showLoading } from "../../Redux/slices";
import axios from "axios";
import { AppHeader } from "../header/AppHeader";
import { AppButton } from "../button/AppButton";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import AxiosInstance from "../../Utils/AxiosInstance";
import { ResidentInfo } from "../../global";

type FeedBackModalProps = {
  visible: boolean,
  hideModal: () => void
}
export const FeedBackModal = ({ ...props }: FeedBackModalProps) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string>("");
  const [feedBack, setFeedBack] = useState<string>("");
  const options: any = {
    mediaType: "photo",
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000
  };
  const { user } = useAppSelector(state => {
    return state.root.user;
  }) as { user: ResidentInfo };
  const selectImage = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("Image picker error: ", response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri || "";
        setImage(imageUri);
        try {
          dispatch(showLoading());
          const formData = new FormData();
          formData.append("image", {
            uri: imageUri,
            type: response.assets?.[0]?.type,
            name: response.assets?.[0]?.fileName
          });
          axios.post(
            "https://fpoly-hcm.herokuapp.com/api/media/upload",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          ).then(res => {
            console.log(res.data.data);
            setImage(res.data.data.path);
            return res.data;
          }).finally(() => {
            dispatch(offLoading());
          });
        } catch (err) {
          // console.log(err.message);
        }
      }
    }).then(() => {
      console.log("123");
    });
  };

  const sendFeedBack = () => {
    dispatch(showLoading());
    AxiosInstance().post("user/addFeedBack", {
      sender: user.fullName,
      "image": image,
      "content": feedBack,
      "residentId": "admin",
      "time": new Date().toISOString()
    })
      .then(res => {
        Alert.alert("Gửi phản hồi thành công");
      })
      .catch(err => {
        Alert.alert("Gửi phản hồi thất bại");
      })
      .finally(() => {
        dispatch(offLoading());
      });
  };
  return <Modal
    animationType={"slide"}
    visible={props.visible}
    style={{ flex: 1 }}>
    <StatusBar translucent />
    <AppHeader
      showBackButton
      backPress={props.hideModal}
      title={"Gửi Feedback đến chủ nhà"} />
    <View style={{ flex: 1, padding: 16, gap: 24 }}>
      <Text style={{ fontSize: 15, fontWeight: "400", color: colors.text }}>
        Đóng góp của bạn về chung cư giúp chúng tôi hoàn thiện, và tạo môi trường sống tốt nhất đến với mọi cư dân,
        thong tin của bạn sẽ được ẩn danh và giải quyết!
      </Text>
      <TextInput
        value={feedBack}
        onChangeText={(text) => {
          setFeedBack(text);
        }}
        style={{
          backgroundColor: "#f0f2f5",
          borderRadius: 8,
          minHeight: 100,
          padding: 16
        }}
        placeholder={"Phản hồi của bạn..."}
        multiline />
      <TouchableOpacity onPress={selectImage}>
        <View style={{
          backgroundColor: "#f0f2f5",
          borderRadius: 8,
          minHeight: 200,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {
            image ? <Image
              resizeMode={"cover"}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8
              }}
              source={{ uri: image }} /> : <Text style={{ color: colors.text }}>Thêm ảnh</Text>
          }
        </View>
      </TouchableOpacity>
      <AppButton label={"Gửi phản hôi"} onPress={() => {
        sendFeedBack();
      }} />
    </View>
  </Modal>;
};


const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  infoContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 16,
    alignSelf: "center"
  },
  textInfo: {
    fontWeight: "bold",
    fontSize: 22,
    color: colors.primary,
    textAlign: "center"
  },
  textInfo2: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.text
  }
});
