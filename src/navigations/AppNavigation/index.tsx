import { createStackNavigator } from "@react-navigation/stack";
import { AppNavigationParamList, appScreens, AppStackName } from "./config";
import { localStorage } from "../../utils/storage";
import { offLoading, useAppDispatch } from "../../redux";
import { useEffect } from "react";

const AppStack = createStackNavigator<AppNavigationParamList>();
export const AppNavigator = () => {
  const token = localStorage.getString("token");
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(offLoading())
  },[])
  return (
    <AppStack.Navigator
      initialRouteName={token ? AppStackName.Home : AppStackName.Login}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal"
      }}>
      {appScreens.map((screen) => {
        return <AppStack.Screen
          options={screen.options}
          key={screen.name}
          component={screen.component}
          name={screen.name} />;
      })}
    </AppStack.Navigator>
  );
};
