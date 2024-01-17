import React, {useState} from "react";
import {Modal, StyleSheet, View} from "react-native";
import {AppThemeColors} from "../../themes";
import {AppHeader} from "../header/AppHeader";
import {useTheme} from "../../hooks";
import {AppTextInput} from "../text_input/AppTextInput";
import {AppButton} from "../button/AppButton";
import {useAppDispatch} from "../../redux";
import {sendNoti} from "../../redux/actions/resident.action";
// add payment to resident
// add payment to resident
type AddPaymentModalProps = {
    visible: boolean,
    hide: () => void,
    residentId: string,
}
const AddNotificationModal = ({visible, hide, residentId}: AddPaymentModalProps) => {
    const [content, setContent] = useState<string>("");
    const dispatch = useAppDispatch();
    const {colors} = useTheme();
    return <Modal
        transparent
        animationType={"fade"}
        visible={visible}
        style={{flex: 1}}>
        <AppHeader
            backPress={hide}
            showBackButton
            title={"Gửi thông báo"}/>
        <View style={{flex: 1, backgroundColor: colors.background, padding: 16}}>
            <AppTextInput
                value={content}
                onTextChange={setContent}
                placeHolder={"Nội dung"}
                label={"Thông báo tới cư dân"}/>
            <AppButton label={"Gửi"} onPress={() => {
                dispatch(sendNoti({id: residentId, noti: content})).then((res: any) => {
                    if (!res.error) {
                        console.log(res);
                        hide();
                    }
                });
            }}/>
        </View>
    </Modal>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({});
export default AddNotificationModal;
