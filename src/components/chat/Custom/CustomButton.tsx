/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View, Pressable, ButtonProps} from 'react-native';
import React from 'react';
import {COLORS} from '../../Utils/Colors';
import {CustomButtonProps} from '../../Models/CustomComponents';

const CustomButton = ({
  title,
  btnStyles,
  textStyles,
  onPress,
}: CustomButtonProps) => {
  return (
    <Pressable
      style={{...styles.button, ...btnStyles}}
      onPress={onPress}
      android_ripple={{color: 'white'}}>
      <Text style={{...styles.buttonText, ...textStyles}}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 10,
    width: '85%',
    paddingVertical: 15,
  },
  buttonText: {
    color: COLORS.secondaryTextColor,
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
  },
});
