import { StackNavigationOptions } from "@react-navigation/stack";
import { AppStackName } from "./AppNavigation/config";

export const defaultScreenOption: StackNavigationOptions = {
  headerShown:false
};

export interface Screen {
  component: () => React.JSX.Element,
  name: AppStackName,
  options: StackNavigationOptions
}


