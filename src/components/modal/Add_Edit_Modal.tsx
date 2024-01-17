import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppThemeColors} from '../../themes';
import {TaskStatus} from './AddTaskModal';
import {useTheme} from '../../hooks';
import {TaskColors} from '../../screens/task';

type SetStatusModalProps = {
  editCus?: string;
  delCus?: string;
  visible: boolean;
  setStatus: (status: TaskStatus) => void;
  hide: () => void;
  onEdit: () => void;
  onDelete: () => void;
};
const AddEditModal = ({...props}: SetStatusModalProps) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  return (
    <Modal
      onTouchEndCapture={props.hide}
      statusBarTranslucent
      transparent
      animationType={'fade'}
      visible={props.visible}
      style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.hide();
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              props.onEdit();
              props.hide();
            }}
            style={styles.cardContainer}>
            <Text style={[styles.label, {color: TaskColors.doing}]}>
              {props.editCus ? props.editCus : 'Chỉnh sửa'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              props.onDelete();
              props.hide();
            }}
            style={styles.cardContainer}>
            <Text style={[styles.label, {color: 'red'}]}>
              {props.delCus ? props.delCus : 'Xoá'}
            </Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const useStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    label: {
      color: colors.primary,
      fontWeight: 'bold',
      fontSize: 16,
    },
    cardContainer: {
      height: 56,
      paddingHorizontal: 8,
      paddingVertical: 16,
      gap: 4,
      backgroundColor: 'white',
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default AddEditModal;
