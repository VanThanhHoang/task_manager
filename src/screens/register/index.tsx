import React from "react";
import { AppScreenContainer } from "../../layout";
import { FormLogin } from "./components/FormLogin";
import { ChangeThemeModeSwitch } from "./components/ChangeThemeModeSwitch";
import { Title } from "./components/Title";

const RegisterScreen = () => {
  return <AppScreenContainer customStyles={{ padding: 16 }}>
    <Title />
    <FormLogin />
  </AppScreenContainer>;
};
export default RegisterScreen;
