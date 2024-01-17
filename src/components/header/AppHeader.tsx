import {Appbar} from "react-native-paper";
import React from "react";
import {useTheme} from "../../hooks";
import {useNavigation} from "@react-navigation/native";
import {AppNavigationProp} from "../../navigations/AppNavigation/config";

type  AppHeaderProps = {
    title: string,
    showBackButton?: boolean,
    action?: React.ReactNode,
    backPress?: () => void
}
export const AppHeader = ({title, showBackButton, action, backPress}: AppHeaderProps) => {
    const {colors} = useTheme();
    const navigation = useNavigation<AppNavigationProp>();
    return <Appbar.Header
        mode="small"
        style={{
            backgroundColor: 'white',
        }}>
        {showBackButton &&
            <Appbar.BackAction
                color={colors.primary}
                onPress={() => {
                    backPress
                        ? backPress()
                        : navigation.goBack();
                }}/>}
        <Appbar.Content
            titleStyle={{fontWeight: '900'}}
            color={colors.primary}
            title={title}/>
        {action && action}
    </Appbar.Header>;
};
