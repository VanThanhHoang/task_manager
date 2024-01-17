import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export type  MenuItemProps = {
  label: string,
  onPress: () => void,
  image:ImageSourcePropType,
}
export const MenuItem = ({ ...props }: MenuItemProps) => {
  return <TouchableOpacity onPress={props.onPress} style={{
    height: 200,
    width: "48%",
  }}>
    <ImageBackground
      borderRadius={12}
      resizeMode="cover"
      style={{ flex: 1, borderRadius: 18 }}
      source={props.image}>
      <View style={{
        height: "40%",
        width: "100%",
        bottom: 0,
        position:'absolute',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor:'rgba(0,0,0,0.5)',
        padding:8,alignItems:'center',
        justifyContent:'center'
      }}>
        <Text style={{
          color:'white',
          fontWeight:'500',
          fontSize:16
        }}>{props.label}</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>;
};
