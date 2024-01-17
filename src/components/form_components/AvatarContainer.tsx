import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppThemeColors } from "../../themes";
import { useTheme } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import AxiosInstance from "../../utils/AxiosInstance";
import axios from "axios";
import { offLoading, showLoading, useAppDispatch } from "../../redux";

export const AvatarContainer = ({setUrl,image}:{setUrl:(url:string)=>void,image:string}) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const dispatch = useAppDispatch();
  const openImagePicker = () => {
    const options: any = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("Image picker error: ", response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri || "";
        setUrl(imageUri);
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
            setUrl(res.data.data.path);
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
  return <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{
        uri: image ? image : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
      }} />
    <TouchableOpacity
      onPress={() => {
        openImagePicker();
      }}
      style={{ width: 180 }}>
      <FontAwesomeIcon
        size={25}
        style={{
          position: "absolute",
          right: 10,
          bottom: 0
        }}
        color={colors.primary}
        icon={faPenToSquare} />
    </TouchableOpacity>
  </View>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    height: 200,
    alignItems: "center"
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 90
  }
});
