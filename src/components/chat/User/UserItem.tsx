/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../Utils/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {screenDimensions} from '../../Utils/Screen';
import {getFirstLetters} from '../../Helper/filter';

const UserItem = ({name, onPress}: any) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.image}>
        <Text style={styles.nameLetters}>{getFirstLetters(name)}</Text>
      </View>

      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity onPress={onPress}>
        <Icon name="wechat" size={32} color={COLORS.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    width: screenDimensions.width / 2.5,
    height: screenDimensions.height / 4,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 10,
    marginVertical: 4,
    padding: 10,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  nameLetters: {
    fontWeight: '600',
    fontSize: 17,
    color: 'black',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.primaryTextColor,
    textAlign: 'center',
  },
  shadow: {
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.6,
    elevation: 20,
    // background color must be set
  },
});
