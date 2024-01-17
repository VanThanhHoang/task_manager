import React from "react";
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {AppThemeColors} from "../../themes";
import {TaskStatus} from "./AddTaskModal";
import {useTheme} from "../../hooks";
import {TaskColors} from "../../screens/task";

type SetStatusModalProps = {
    visible: boolean,
    setStatus: (status: TaskStatus) => void,
    hide: () => void,
    status:TaskStatus
}
const SetStatusModal = ({...props}: SetStatusModalProps) => {
    const {colors} = useTheme()
    const styles = useStyles(colors)
    const margin = [0,15,30,45,60]

    return <Modal
        statusBarTranslucent
        transparent
        animationType={"fade"}
        visible={props.visible}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: 'center', alignItems: 'center'}}>
            <Pressable
                onPress={()=>{
                    props.setStatus(TaskStatus.todo)
                    props.hide()
                }}
                style={{
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                height: 56,
                paddingHorizontal: 8,
                paddingVertical: 16,
                gap: 4,
                backgroundColor: props.status === TaskStatus.todo ? '#ECECEC': 'white',
                width: 300,
                justifyContent: 'center',
                alignItems: 'center'

            }}>
                <Text style={[styles.label ,{color:TaskColors.todo}]}>Việc cần làm</Text>
            </Pressable>
            <Pressable
                onPress={()=>{
                    props.setStatus(TaskStatus.doing)
                    props.hide()

                }}
                style={{
                height: 56,
                paddingHorizontal: 8,
                paddingVertical: 16,
                gap: 4,
                backgroundColor: props.status === TaskStatus.doing ? '#ECECEC': 'white',
                width: 300,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={[styles.label ,{color:TaskColors.doing}]}>Đang làm</Text>
            </Pressable>
            <Pressable
                onPress={()=>{
                    props.setStatus(TaskStatus.complete)
                    props.hide()

                }}
                style={{
                height: 56,
                paddingHorizontal: 8,
                paddingVertical: 16,
                gap: 4,
                backgroundColor: props.status === TaskStatus.complete ? '#ECECEC': 'white',
                width: 300,
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={[styles.label ,{color:TaskColors.done}]}>Đã hoàn thành</Text>
            </Pressable>
        </View>
    </Modal>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({
    label: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16
    }
});
export default SetStatusModal;
