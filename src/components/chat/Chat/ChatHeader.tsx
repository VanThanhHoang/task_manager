/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {getFirstLetters} from '../../../Helper/filter';
import {COLORS} from '../../../utils/Colors';
import {screenDimensions} from '../../../utils/Styles';
import {IconButton} from 'react-native-paper';

const ChatHeader = ({avatar_url, name}: any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={[styles.backContainer, styles.shadow]}>
          <IconButton icon={'keyboard-backspace'} />
        </View>
      </TouchableOpacity>
      <View>
        <View style={styles.image}>
          <Text style={styles.nameLetters}>{getFirstLetters(name)}</Text>
        </View>
      </View>
      {/* <Image
        source={{
          uri: avatar_url,
        }}
        style={styles.image}
      /> */}

      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.screenBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.dividerColor,
    marginBottom: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    marginLeft: 40,
  },
  nameLetters: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primaryTextColor,
    marginLeft: 20,
  },
  backContainer: {
    width: 40,
    height: screenDimensions.height / 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: 5,
  },
  shadow: {
    shadowOffset: {width: 2, height: 2},
    shadowColor: COLORS.dividerColor,
    shadowOpacity: 0.4,
    elevation: 1,
    // background color must be set
  },
});
