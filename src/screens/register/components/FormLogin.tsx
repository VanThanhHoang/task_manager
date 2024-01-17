import {AppTextInput} from "../../../components/text_input/AppTextInput";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {AppNavigationProp, AppStackName} from "../../../navigations/AppNavigation/config";
import {Formik} from "formik";
import {Alert, ScrollView, Text, TouchableOpacity} from "react-native";
import {AppButton} from "../../../components/button/AppButton";
import {object, string} from "yup";
import {offLoading, showLoading, useAppDispatch} from "../../../redux";
import AxiosInstance from "../../../utils/AxiosInstance";

type LoginFormType = {
    userName: string,
    password: string,
    email: string
}
export const FormLogin = () => {
    const appDispatch = useAppDispatch();
    let loginValidateSchema = object({
        userName: string().required("Vui lòng điền tài khoản"),
        password: string().required("Vui lòng điền mật khẩu"),
        email: string().required("Vui lòng điền email của bạn").email("Email không hợp lệ")
    });
    const initialLoginForm: LoginFormType = {
        password: "",
        userName: "",
        email: ""
    };
    const navigation = useNavigation<AppNavigationProp>();
    return <Formik
        validationSchema={loginValidateSchema}
        initialValues={initialLoginForm}
        onSubmit={(values) => {
            const {userName, password, email} = values;
            appDispatch(showLoading())
            AxiosInstance().post('/user/register', {
                "userName": userName,
                "email": email,
                "password": password,
                "img": "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
            }).then(res => {
                Alert.alert("Đăng kí thành công", "Vui lòng đăng nhập để tiếp tục")
            }).finally(() => {
                appDispatch(offLoading())
            }).catch(err => {
                Alert.alert("Đăng kí thất bại , Email đã được sử dụng", "Vui lòng thử lại")
            })
        }}>
        {({handleChange, handleSubmit, values}) => (
            <ScrollView
                keyboardShouldPersistTaps={"always"}
                style={{gap: 30}}>
                <AppTextInput
                    nameValidate={"userName"}
                    placeHolder={"Nhập tài khoản của bạn"}
                    label={"Tên tài khoản"}
                    value={values.userName}
                    onTextChange={handleChange("userName")}/>
                <AppTextInput
                    nameValidate={"email"}
                    placeHolder={"Nhập email của bạn"}
                    label={"Email"}
                    value={values.email}
                    onTextChange={handleChange("email")}/>
                <AppTextInput
                    nameValidate={"password"}
                    password
                    placeHolder={"Nhập mật khẩu của bạn"}
                    label={"Mật khẩu"}
                    value={values.password}
                    onTextChange={handleChange("password")}/>
                <AppButton label={"Đăng kí"} onPress={() => handleSubmit()
                }/>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate(AppStackName.Login)
                }}>
                    <Text style={{
                        color:'#A1A2A9',
                        textAlign:'center',
                        fontSize:14,
                        fontWeight:'bold'
                    }}> Đã có tài khoản?</Text>
                    <Text
                        style={{
                            color:'#092642',
                            textAlign:'center',
                            fontSize:17,
                            fontWeight:'bold'
                        }}> Đăng nhập và trải nghiệm ngay</Text>
                </TouchableOpacity>
            </ScrollView>)}
    </Formik>;
};
;

