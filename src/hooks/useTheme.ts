import { changeThemeMode, useAppDispatch, useAppSelector } from "../redux";
import { COLD_COLOR, HOT_COLOR } from "../themes";
import { StatusBar } from "react-native";
import { useEffect } from "react";

export const useTheme = () => {
  const appDispatch = useAppDispatch();
  const { isHotMode } = useAppSelector(state => state.root.app);
  useEffect(() => {
    StatusBar.setBarStyle(isHotMode ? "dark-content" : "light-content");
  }, [isHotMode]);
  return {
    colors: isHotMode ? HOT_COLOR : COLD_COLOR,
    changeThemeMode: () => {
      return appDispatch(changeThemeMode());
    },
    isHotMode,
  };
};
