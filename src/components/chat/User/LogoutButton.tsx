/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../Utils/Colors';

const LogoutButton = () => {
  return (
    <View style={styles.container}>
      <Icon name="logout" size={28} color={COLORS.primaryColor} />
    </View>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
