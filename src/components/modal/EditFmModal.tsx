import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppHeader} from '../header/AppHeader';
import {AppButton} from '../button/AppButton';
import {useTheme} from '../../hooks';
import {AppTextInput} from '../text_input/AppTextInput';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import SelectMembersModal from './SelectMembersModal';
import {Family, User} from '../../global';
import {
  offLoading,
  showLoading,
  useAppDispatch,
  useAppSelector,
} from '../../redux';
import AxiosInstance from '../../utils/AxiosInstance';

type AddPaymentModalProps = {
  family?: Family;
  visible: boolean;
  hide: (id?: string, name?: string) => void;
  setFamilies?: (famil: Family) => void;
};
const EditFamilyModal = ({
  visible,
  hide,
  setFamilies,
  family,
}: AddPaymentModalProps) => {
  const [name, setName] = React.useState('');
  const dispatch = useAppDispatch();
  const [member, setMember] = React.useState<User[]>([]);
  const addFamily = () => {
    if (name === '') {
      Alert.alert('Vui lòng nhập tên gia đình');
      return;
    }
    dispatch(showLoading());
    family &&
      AxiosInstance()
        .patch('family/updateName/' + family?._id, {
          name,
        })
        .then(res => {
          ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        })
        .finally(() => {
          dispatch(offLoading());
          hide(family._id, name);
        });
  };
  useEffect(() => {
    if (family) {
      setName(family.name);
    }
  }, [family]);
  return (
    <Modal
      statusBarTranslucent
      transparent
      animationType={'slide'}
      visible={visible}
      style={{flex: 1}}>
      <AppHeader
        backPress={hide}
        showBackButton
        title={'Cập nhật gia đình ' + `${family && family.name}`}
      />
      <View
        style={{
          padding: 16,
          backgroundColor: 'white',
          flex: 1,
        }}>
        <AppTextInput
          value={name}
          onTextChange={setName}
          placeHolder={'Nhập tên gia đình'}
          label={'Tên gia đình'}
        />
        <AppButton label={'Cập nhật'} onPress={addFamily} />
      </View>
    </Modal>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
      gap: 16,
    },
    label: {
      fontWeight: '700',
      color: colors.primary,
      fontSize: 16,
    },
  });

export default EditFamilyModal;
