import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Animations } from "../../../assets/animations";
import React from "react";
import { useTheme } from "../../../hooks";
import { AppThemeColors } from "../../../themes";
import { TextSize } from "../../../layout/Sizing";
export const Title = () => {
  const { colors, changeThemeMode, isHotMode } = useTheme();
  const styles = useStyles(colors);
  return <View style={styles.titleContainer}>
    <LottieView
      autoPlay
      source={Animations.login}
      style={{
        height: "65%"
      }} />
    <Text style={styles.lageTitle}>Register</Text>
    <Text style={styles.subTitle}>
     Đăng ký tài khoản cho quản lý công việc</Text>
  </View>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  titleContainer: {
    height: "40%",
    justifyContent: "center"
  },
  lageTitle: {
    color: colors.text,
    fontSize: TextSize.title,
    fontWeight: "bold"
  },
  subTitle: {
    color: colors.text,
    fontSize: TextSize.sub
  }
});
