import React, {useEffect} from "react";
import {Alert, Image, Modal, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {AppHeader} from "../header/AppHeader";
import {AppButton} from "../button/AppButton";
import {useTheme} from "../../hooks";
import {AppTextInput} from "../text_input/AppTextInput";
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import SelectMembersModal from "./SelectMembersModal";
import {Family, User} from "../../global";
import {offLoading, showLoading, useAppDispatch, useAppSelector} from "../../redux";
import AxiosInstance from "../../utils/AxiosInstance";
import AddMembersComponent from "../add_members/AddMembersComponent";

type AddPaymentModalProps = {
    familyMembers?: User [],
    visible: boolean,
    hide: () => void,
    setFamilies?: (families: Family) => void
}
const AddFamilyModal = ({visible, hide, setFamilies}: AddPaymentModalProps) => {
    const {colors} = useTheme();
    const [name, setName] = React.useState('')
    const dispatch = useAppDispatch()
    const [image, setImage] = React.useState('')
    const [member, setMember] = React.useState<User[]>([])
    const [showSelectMembers, setShowSelectMembers] = React.useState(false)
    const styles = useStyles(colors)
    const {user} = useAppSelector(state => state.root.user)

    const addFamily = () => {
        if (name === '') {
            Alert.alert('Vui lòng nhập tên gia đình')
            return
        }
        dispatch(showLoading())
        AxiosInstance().post('family/create', {
            name,
            createBy: {
                _id: user.id,
                ...user
            },
            newMembers: member
        }).then(res => {
            setFamilies && setFamilies(res.data)
            ToastAndroid.show('Thêm gia đình thành công', ToastAndroid.SHORT)
            setName('')
            setImage('')
            setMember([])
        }).finally(() => {
            dispatch(offLoading())
            hide()
        });
    }
    return <Modal
        statusBarTranslucent
        transparent
        animationType={"slide"}
        visible={visible}
        style={{flex: 1}}>
        <AppHeader
            backPress={hide}
            showBackButton
            title={"Thêm gia đình"}/>
        <ScrollView style={{backgroundColor: colors.background}} contentContainerStyle={styles.container}>
            <AppTextInput
                value={name}
                onTextChange={setName}
                placeHolder={"Nhập tên gia đình"}
                label={"Tên gia đình"}/>
            <AddMembersComponent
                setShowSelectMembers={setShowSelectMembers}
                member={member}
                setMember={(member: User[]) => {
                    setMember(member)
                }}/>
            <AppButton label={"Thêm"} onPress={addFamily}/>
        </ScrollView>
        <SelectMembersModal
            memberSelected={member}
            visible={showSelectMembers}
            setMembers={setMember}
            hide={() => {
                setShowSelectMembers(false)
            }}/>
    </Modal>
};


const useStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
        gap: 16,
    },
    label: {
        fontWeight: "700",
        color: colors.primary,
        fontSize: 16
    }
});

export default AddFamilyModal;


