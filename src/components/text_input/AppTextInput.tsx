import {KeyboardTypeOptions, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import {AppThemeColors} from "../../themes";
import {useTheme} from "../../hooks";
import {ErrText} from "../text/ErrText";

export type  AppTextInputProps = {
    multiline?: boolean,
    nameValidate?: string,
    placeHolder: string,
    label: string,
    value?: string,
    password?: boolean,
    onTextChange?: (text: string) => void
    onPress?: () => void,
    modalTextInput?: boolean,
    keyboardType?: KeyboardTypeOptions,
    disable?: boolean,
    textColor?:string
}
export const AppTextInput = ({...props}: AppTextInputProps) => {
    const {colors} = useTheme();
    const styles = useStyles(colors);
    return <View style={{gap: 8}}>
        <Text style={styles.label}>{props.label}</Text>
        <Pressable
            onPress={props.onPress}>
            <TextInput
                multiline={props.multiline}
                keyboardType={props.keyboardType && props.keyboardType}
                editable={!props.modalTextInput}
                value={props.value}
                onChangeText={props.onTextChange}
                placeholder={props.placeHolder}
                placeholderTextColor={colors.subText}
                secureTextEntry={props.password}
                cursorColor={colors.primary}
                style={[{
                    ...styles.textInputContainer,
                    color:props.textColor ?? 'black'
                },
                    props.multiline && {
                  height:'auto',
                },
                ]}/>
            {props.nameValidate && <ErrText name={props.nameValidate}/>}
        </Pressable>
    </View>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
    textInputContainer: {
        height: 48,
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: "#efeeee",
        width: "100%",
        fontWeight: "500"
    },
    label: {
        fontWeight: "700",
        color: colors.primary,
        fontSize: 16
    }
});
