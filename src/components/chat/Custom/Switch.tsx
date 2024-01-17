import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { AppThemeColors } from "../../themes";
import { useTheme } from "../../hooks";

type  ChangeThemeModeSwitchProps = {
  nameItem1: string,
  nameItem2: string,
  onItem1: () => void,
  onItem2: () => void,
  notAb?:boolean,
}
export const SwitchCustom = ({ ...props }: ChangeThemeModeSwitchProps) => {
  const { colors} = useTheme();
  const [isSelected,setSelect]=useState<boolean>(false)
  const styles = useStyles(colors);
  return <View style={[
    styles.themeModeContainer,
    {position: props.notAb?'relative':'absolute'}]}>
    <Text style={styles.themeModeText}>
      {isSelected
        ? props.nameItem1
        : props.nameItem2}
    </Text>
    <Switch
      value={isSelected}
      trackColor={{
        true: colors.subText,
        false: colors.subText
      }}
      thumbColor={isSelected?colors.primary: colors.itemText}
      onValueChange={(value) => {
        console.log(value)
        if (value) props.onItem2()
        else props.onItem1();
        setSelect(value)

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
    right: 0
  },
  themeModeText: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 16
  }
});
