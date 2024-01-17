import { SafeAreaView,StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "../hooks";
import { AppThemeColors } from "../themes";
interface AppScreenContainer {
  children: React.ReactNode;
  customStyles?:ViewStyle
}
export const AppScreenContainer = ({ children ,customStyles}: AppScreenContainer) => {
  const { colors } = useTheme();
  const styles = useStyles(colors)
  return <SafeAreaView style={[styles.container,customStyles]}>
    {children}
  </SafeAreaView>;
};
const useStyles = (colors:AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
