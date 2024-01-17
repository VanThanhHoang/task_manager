import {AppScreenContainer} from "../../layout";
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useTheme} from "../../hooks";
import {AppHeader} from "../../components/header/AppHeader";
import {Family} from "../../global";
import {useAppDispatch} from "../../redux";
import {useNavigation} from "@react-navigation/native";
import {AppNavigationProp, AppStackName} from "../../navigations/AppNavigation/config";
import {IconButton} from "react-native-paper";
import {localStorage} from "../../utils/storage";
import ChangePassModal from "../../components/modal/ChangePassModal";
import EditProfileModal from "../../components/modal/EditProfileModal";


const MenuScreen = () => {
    const navigation = useNavigation<AppNavigationProp>();
    const [families, setFamilies] = useState<Family[]>([])
    const {colors} = useTheme();
    const dispatch = useAppDispatch()
    const styles = useStyle(colors)
    const [showEditProfile, setShowEditProfile] = useState<boolean>(false)
    const [showChangePassModal, setShowChangePassModal] = useState<boolean>(false)
    return <AppScreenContainer>
        <AppHeader
            title={"Tài khoản"}/>
        <View style={{
            padding: 16,
            gap: 8
        }}>
            <TouchableOpacity
                onPress={() => {
                    setShowEditProfile(true)
                }} style={styles.cardContainer}>
                <IconButton icon={'account'} iconColor={'#092642'} size={26}/>
                <Text style={styles.text}>Chỉnh sửa thông tin cá nhân</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setShowChangePassModal(true)
                }} style={styles.cardContainer}>
                <IconButton icon={'lastpass'} iconColor={'#092642'} size={26}/>
                <Text style={styles.text}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
        <ChangePassModal visible={showChangePassModal} hide={()=>setShowChangePassModal(false)}/>
        <TouchableOpacity
            onPress={() => {
                Alert.alert(
                    'Xác ',
                    'Bạn có muốn đăng xuất khỏi ứng dụng',
                    [
                        {
                            text: 'Đăng xuất',
                            onPress: () => {
                                localStorage.clearAll()
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: AppStackName.Login }]
                                });
                            },
                        },
                        {
                            text: 'Huỷ',
                            onPress: () => console.log('Bạn đã chọn Nút 2'),
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false }
                );
            }} style={{
            ...styles.cardContainer,
            width:200,
            position:'absolute',
            bottom:20,
            alignSelf:'center',
            borderRadius:8,
            height:60,
            }}>
            <IconButton icon={'logout'} iconColor={'#092642'} size={26}/>
            <Text style={styles.text}>Đăng xuất</Text>
        </TouchableOpacity>
        <EditProfileModal visible={showEditProfile} hide={() => {
            setShowEditProfile(false)
        }}/>
    </AppScreenContainer>;
};
const useStyle = (colors: any) => StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 16,
        paddingHorizontal: 24
    },
    text: {
        fontSize: 14,
        color: '#092642',
        fontWeight: 'bold'
    }
})
export default MenuScreen;
