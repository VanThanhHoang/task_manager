import React, {} from "react";
import { Modal, StyleSheet, View } from "react-native";
import { AppThemeColors } from "../../themes";
import { useAppSelector } from "../../redux";
import LottieView from "lottie-react-native";
import { Animations } from "../../assets/animations";

const LoadingModal = () => {
  const { isLoading } = useAppSelector(state => state.root.app);
  return <Modal
    transparent
    statusBarTranslucent
    animationType={"fade"}
    visible={isLoading}
    style={{ flex: 1 }}>

    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <LottieView
        autoPlay
        loop
        style={{ flex: 1 }}
        source={Animations.loading} />
    </View>
  </Modal>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({});
export default LoadingModal;
