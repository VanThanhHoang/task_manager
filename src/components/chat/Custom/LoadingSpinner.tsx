/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {COLORS} from '../../Utils/Colors';
import {CustomLoadingSpinnerProps} from '../../Models/CustomComponents';

const LoadingSpinner = ({isLoading}: CustomLoadingSpinnerProps) => {
  const styles = StyleSheet.create({
    indicatorWrapper: {
      display: isLoading ? 'flex' : 'none',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(100, 100, 100, 0.9)',
      elevation: 5,
      zIndex: 5,
    },
    indicatorText: {
      fontSize: 18,
      marginTop: 14,
      fontWeight: '700',
      color: COLORS.primaryColor,
      textAlign: 'center',
    },
  });
  return (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" color={COLORS.primaryColor} />
      <Text style={styles.indicatorText}>Loading ...</Text>
    </View>
  );
};

export default LoadingSpinner;
