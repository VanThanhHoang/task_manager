import { Appbar } from "react-native-paper";
import React from "react";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/native";

type  AppHeaderProps = {
  title: string,
  showBackButton?: boolean,
  action?: React.ReactNode,
  backPress?: () => void
}
export const AppHeader = ({ title, showBackButton, action, backPress }: AppHeaderProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return <Appbar.Header
    mode="small"
    style={{
      backgroundColor: colors.primary,
      borderBottomRightRadius: 14,
      borderBottomLeftRadius: 14
    }}>
    {showBackButton &&
      <Appbar.BackAction
        color={colors.textOnPrimary as string}
        onPress={() => {
          backPress
            ? backPress()
            : navigation.goBack();
        }} />}
    <Appbar.Content
      color={colors.textOnPrimary as string}
      title={title} />
    {action && action}
  </Appbar.Header>;
};
