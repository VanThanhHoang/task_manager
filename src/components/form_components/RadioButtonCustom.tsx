import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import * as React from "react";
import { AppThemeColors } from "../../themes";
import { useTheme } from "../../hooks";

type  RadioButtonCustomProps = {
  isChecked: boolean,
  onSelected: () => void,
  name: string
}
export const RadioButtonCustom = ({ isChecked, onSelected, name }: RadioButtonCustomProps) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return <TouchableOpacity
    onPress={onSelected}
    style={{ flexDirection: "row", alignItems: "center" }}>
    <RadioButton
      onPress={onSelected}
      color={colors.primary}
      value="first"
      status={isChecked ? "checked" : "unchecked"}
    />
    <Text style={styles.label}>{name}</Text>
  </TouchableOpacity>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  label: {
    fontWeight: "700",
    color: colors.primary,
    fontSize: 16
  }
});
