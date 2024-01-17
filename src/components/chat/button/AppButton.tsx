import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

type AppButtonProps = {
  label: string,
  onPress: () => void,
  style?:ViewStyle,
}
export const AppButton = React.memo(({ label,style, onPress }: AppButtonProps) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return <TouchableOpacity onPress={onPress} style={[styles.container,style && style]}>
    <Text style={styles.label}>{label}</Text>
    {/*<FontAwesomeIcon*/}
    {/*  color={colors.textOnPrimary }*/}
    {/*  icon={faRightFromBracket} />*/}
  </TouchableOpacity>;
});
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: colors.primary,
    width: "100%",
    marginVertical: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 16
  },
  label: {
    fontWeight: "bold",
    color: colors.textOnPrimary,
    fontSize: 18
  }
});
