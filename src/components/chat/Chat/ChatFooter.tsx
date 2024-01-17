/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, TouchableOpacity, View, TextInput} from 'react-native';
import React from 'react';
import {ChatFooter_Prop} from '../../../Models/ComponentsProps';
import {screenDimensions} from '../../../utils/Styles';
import {COLORS} from '../../../utils/Colors';
import {IconButton} from 'react-native-paper';

const ChatFooter = ({message, setMessage, handleMessage}: ChatFooter_Prop) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type somthing.."
          multiline={true}
          value={message}
          onChangeText={text => setMessage(text)}
          style={{height: '100%'}}
        />
      </View>
      <IconButton
        onPress={() => {
          handleMessage({test: 'a'});
        }}
        icon={'send'}
      />
    </View>
  );
};

export default ChatFooter;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: screenDimensions.height / 11,
    backgroundColor: COLORS.optionContainer,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.dividerColor,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    width: screenDimensions.width / 1.3,
    borderColor: COLORS.primaryColor,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 5,
  },
  senderContainer: {
    // width: '20%',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    marginLeft: 40,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.primaryTextColor,
    marginLeft: 20,
  },
  backContainer: {
    backgroundColor: COLORS.dividerColor,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: 5,
  },
  shadow: {
    shadowOffset: {width: 2, height: 2},
    shadowColor: COLORS.dividerColor,
    shadowOpacity: 0.9,
    elevation: 8,
    // background color must be set
  },
});
