import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../hooks';
import {AppThemeColors} from '../../themes';
import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';
import AxiosInstance from '../../utils/AxiosInstance';
import {
  offLoading,
  showLoading,
  useAppDispatch,
  useAppSelector,
} from '../../redux';
import {ResidentInfo} from '../../global';
import {updateUser} from '../../redux/slices/user.slice';
import {AppTextInput} from '../text_input/AppTextInput';
import {AppHeader} from '../header/AppHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

type AddPaymentModalProps = {
  visible: boolean;
  hide: () => void;
};
const options: any = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 2000,
  maxWidth: 2000,
};
const ChangePassModal = ({visible, hide}: AddPaymentModalProps) => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const [showChangePassModal, setShowChangePassModal] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.root.user);
  console.log(user);
  const [fullName, setFullName] = useState<string>(user.userName);
  const [email, setEmail] = useState<string>(user.email);
  const [image, setImage] = useState<string>(user.image ?? '');
  const selectImage = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri || '';
        setImage(imageUri);
        try {
          dispatch(showLoading());
          const formData = new FormData();
          formData.append('image', {
            uri: imageUri,
            type: response.assets?.[0]?.type,
            name: response.assets?.[0]?.fileName,
          });
          axios
            .post(
              'https://fpoly-hcm.herokuapp.com/api/media/upload',
              formData,
              {
                headers: {'Content-Type': 'multipart/form-data'},
              },
            )
            .then(res => {
              console.log(res.data);
              setImage(res.data.data.path);
              return res.data;
            })
            .finally(() => {
              dispatch(offLoading());
            });
        } catch (err) {
          // console.log(err.message);
        }
      }
    }).then(() => {
      console.log('123');
    });
  };
  const validateForm = () => {
    if (fullName.length === 0) {
      Alert.alert('Vui lòng nhập tên');
      return false;
    }
    return true;
  };
  const updateProfile = () => {
    const user2: any = {
      id: user.id,
    };
    if (fullName != user2.userName) {
      user2.userName = fullName;
    }
    user2.img = image;
    console.log(`image` + image);

    dispatch(showLoading());
    AxiosInstance()
      .patch(`user/update/` + user.id, user2)
      .then((res: any) => {
        Alert.alert('Cập nhật thành công');
        setEditMode(false);
        dispatch(updateUser(res.data));
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Có lỗi xảy ra khi cập nhật');
      })
      .finally(() => {
        dispatch(offLoading());
      });
  };
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
        action={
          <Appbar.Action
            onPress={() => {
              console.log(user);

              if (isEditMode) {
                if (fullName == user.userName && image == user.image) {
                  setEditMode(false);
                  return;
                }
                if (!validateForm()) {
                  return;
                }
                updateProfile();
              } else {
                setEditMode(true);
              }
            }}
            color={colors.primary}
            icon={isEditMode ? 'check' : 'account-edit'}
          />
        }
        title={'Cập nhật thông tin'}
      />
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            isEditMode && selectImage();
          }}>
          <Image
            resizeMode={'cover'}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: 'center',
            }}
            source={{
              uri: user.image
                ? user.image
                : 'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png',
            }}
          />
        </Pressable>

        <AppTextInput
          modalTextInput={!isEditMode}
          value={fullName}
          onTextChange={setFullName}
          placeHolder={'Nhập tên của bạn...'}
          label={'Tên'}
        />
      </View>
    </Modal>
  );
};
const useStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
  });

export default ChangePassModal;
