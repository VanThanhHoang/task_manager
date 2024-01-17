import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppHeader} from '../header/AppHeader';
import {useTheme} from '../../hooks';
import {
  offLoading,
  showLoading,
  useAppDispatch,
  useAppSelector,
} from '../../redux';
import AxiosInstance from '../../utils/AxiosInstance';
import {User} from '../../global';
import {AppButton} from '../button/AppButton';
import {Searchbar} from 'react-native-paper';

type AddPaymentModalProps = {
  addTask?: boolean;
  visible: boolean;
  setMembers: (members: any) => void;
  hide: () => void;
  memberSelected: User[];
  familyMembers?: User[];
};
const SelectMembersModal = ({
  visible,
  hide,
  memberSelected,
  setMembers,
  addTask,
  familyMembers,
}: AddPaymentModalProps) => {
  const dispatch = useAppDispatch();
  const [allMembers, setAllMembers] = useState<User[]>([]);
  const [searchQ, setSearchQ] = useState<string>('');
  const [searchMembers, setSearchMember] = useState<User[]>([]);
  const {colors} = useTheme();
  useEffect(() => {
    if (searchQ == '' && allMembers.length != 0) {
      setSearchMember(allMembers);
    } else {
      setSearchMember(
        allMembers.filter(item => {
          return (
            item.userName.toLowerCase().includes(searchQ.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQ.toLowerCase())
          );
        }),
      );
    }
  }, [searchQ]);
  useEffect(() => {
    if (!familyMembers) {
      dispatch(showLoading());
      AxiosInstance()
        .get('user/allUsers')
        .then(res => {
          setAllMembers(res.data);
          setSearchMember(res.data);
        })
        .finally(() => {
          dispatch(offLoading());
        });
    } else {
      setAllMembers(familyMembers);
      setSearchMember(familyMembers);
    }
  }, []);

  const {user} = useAppSelector(state => state.root.user);
  const styles = useStyles(colors);
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
        title={'Thêm người tham gia'}
      />
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: colors.background,
        }}>
        <Searchbar
          inputStyle={{
            backgroundColor: '#efeeee',
          }}
          value={searchQ}
          onChangeText={setSearchQ}
          style={{
            margin: 16,
            backgroundColor: '#efeeee',
            borderRadius: 16,
          }}
          placeholder="Search"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          style={{flex: 1, backgroundColor: colors.background, padding: 16}}>
          {searchMembers.map((member: User) => {
            const isSelect = memberSelected.find(
              (item: User) => item._id === member._id,
            );
            if (member._id === user.id && addTask) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (isSelect) {
                      setMembers(
                        memberSelected.filter(
                          (item: User) => item._id !== member._id,
                        ),
                      );
                    } else {
                      setMembers([...memberSelected, member]);
                    }
                  }}
                  style={[
                    styles.cardContainer,
                    {
                      height: 40,
                    },
                  ]}
                  key={member._id}>
                  <View style={{gap: 8}}>
                    <Text style={{...styles.name, color: colors.primary}}>
                      Gán công việc cho tôi
                    </Text>
                  </View>
                  {isSelect && <View style={styles.dot} />}
                </TouchableOpacity>
              );
            }
            if (member._id === user.id) return null;
            return (
              <TouchableOpacity
                onPress={() => {
                  if (isSelect) {
                    setMembers(
                      memberSelected.filter(
                        (item: User) => item._id !== member._id,
                      ),
                    );
                  } else {
                    setMembers([...memberSelected, member]);
                  }
                }}
                style={styles.cardContainer}
                key={member._id}>
                <Image
                  source={{
                    uri:
                      member.img ??
                      'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png',
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <View style={{gap: 8}}>
                  <Text style={styles.name}>{member.userName}</Text>
                  <Text style={styles.mail}>{member.email}</Text>
                </View>
                {isSelect && <View style={styles.dot} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <AppButton
          label={'Lưu'}
          onPress={() => {
            hide();
          }}
        />
      </View>
    </Modal>
  );
};
const useStyles = (colors: any) =>
  StyleSheet.create({
    cardContainer: {
      height: 70,
      borderBottomWidth: 0.3,
      borderBottomColor: '#A1A2A9',
      marginTop: 16,
      flexDirection: 'row',
      gap: 16,
    },
    name: {
      color: '#292C38',
      fontWeight: 'bold',
    },
    mail: {
      color: '#A1A2A9',
      fontSize: 14,
      fontWeight: '400',
    },
    dot: {
      position: 'absolute',
      right: 16,
      width: 12,
      height: 12,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
  });
const UserCard = () => {};
export default SelectMembersModal;
