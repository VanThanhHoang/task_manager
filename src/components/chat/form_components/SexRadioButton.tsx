import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { RadioButtonCustom } from "./RadioButtonCustom";
import { AppThemeColors } from "../../themes";
import { useTheme } from "../../hooks";
import { useState } from "react";

export const MyComponent = () => {
  const [gender, setGender] = useState<'male'|'female'>("male");
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return (
    <>
      <Text style={styles.label}>Giới tính</Text>
      <View style={{ flexDirection: "row" ,gap:16}}>
        <RadioButtonCustom
          isChecked={gender  =='male'}
          onSelected={() => {
            setGender('male')
          }}
          name={"Nam"} />
        <RadioButtonCustom
          isChecked={gender  =='female'}
          onSelected={() => {
            setGender('female')
          }}
          name={"Nữ"} />
      </View>
    </>
  );
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  label: {
    fontWeight: "700",
    color: colors.primary,
    fontSize: 16
  }
});
export default MyComponent;
