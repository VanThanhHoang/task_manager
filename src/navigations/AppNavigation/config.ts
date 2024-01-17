import LoginScreen from "../../screens/login";
import {defaultScreenOption, Screen} from "../type";
import HomeScreen from "../../screens/home";
import {StackNavigationProp} from "@react-navigation/stack";

import TaskScreen from "../../screens/task";
import {Family} from "../../global";
import AppTabs from "../BottomTabNav";
import RegisterScreen from "../../screens/register";
import SingleChatScreen from "../../screens/Chat/ChatScreen";

export enum AppStackName {
    Login = "Login",
    Home = "Home",
    Task = "ListFloor",
    Register = "Register",
    ChatScreen="ChatScreen"
}

export type AppNavigationParamList = {
    [AppStackName.Login]: undefined,
    [AppStackName.Home]: undefined,
    [AppStackName.Task]: { family: Family },
    [AppStackName.Register]: undefined,
    [AppStackName.ChatScreen]: { family:  Family},

}

export const appScreens: Screen[] = [
    {
        name: AppStackName.Login,
        component: LoginScreen,
        options: defaultScreenOption
    },
    {
        name: AppStackName.Home,
        component: AppTabs,
        options: defaultScreenOption
    },
    {
        name: AppStackName.Task,
        component: TaskScreen,
        options: defaultScreenOption
    },
    {
        name: AppStackName.Register,
        component: RegisterScreen,
        options: defaultScreenOption
    },
    {
        name: AppStackName.ChatScreen,
        component: SingleChatScreen,
        options: defaultScreenOption
    },
];
export  type  AppNavigationProp = StackNavigationProp<AppNavigationParamList>
