import React from "react";
import { Text } from "react-native";
import { ErrorMessage } from "formik";

export const ErrText = React.memo(({name}:{name:string}) => {
  return <Text style={{color:'red',fontWeight:'500'}}>
    <ErrorMessage name={name} />
  </Text>;
});
