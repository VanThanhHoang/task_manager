import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../../hooks";
import { AppThemeColors } from "../../../themes";
export const ChangeThemeModeSwitch = () => {
  const { colors, changeThemeMode, isHotMode } = useTheme();
  const styles = useStyles(colors);
  return <View style={styles.themeModeContainer}>
    <Text style={styles.themeModeText}>
      {isHotMode
        ? "Chế độ tối"
        : "Chế độ sáng"}
    </Text>
    <Switch
      trackColor={{
        true: colors.subText,
        false: colors.subText
    }}
      thumbColor={colors.primary}
      value={isHotMode}
      onValueChange={() => {
        changeThemeMode();
      }} />
  </View>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  themeModeContainer: {
    padding: 16,
    gap: 16,
    flexDirection: "row",
    bottom: 0,
    position: "absolute",
    left: 0
  },
  themeModeText: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 16
  }
});
