import {AppScreenContainer} from '../../layout';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../hooks';
import {AppHeader} from '../../components/header/AppHeader';
import {Appbar, FAB, IconButton} from 'react-native-paper';
import AddFamilyModal from '../../components/modal/AddFamilyModal';
import {Family} from '../../global';
import {
  offLoading,
  showLoading,
  useAppDispatch,
  useAppSelector,
} from '../../redux';
import Add_Edit_Modal from '../../components/modal/Add_Edit_Modal';

import AxiosInstance from '../../utils/AxiosInstance';
import {useNavigation} from '@react-navigation/native';
import {
  AppNavigationProp,
  AppStackName,
} from '../../navigations/AppNavigation/config';
import {
  getCardStatusColor,
  TaskStatus,
} from '../../components/modal/AddTaskModal';
import EditFamilyModal from '../../components/modal/EditFmModal';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const HomeScreen = () => {
  const [familyFc, setFamilyFc] = useState<Family>();
  const navigation = useNavigation<AppNavigationProp>();
  const [families, setFamilies] = useState<Family[]>([]);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const styles = useStyle(colors);
  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
  const {user} = useAppSelector(state => state.root.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const addFamily = (family: Family) => {
    setFamilies([...families, family]);
  };
  const fetchFMFromApi = async () => {
    dispatch(showLoading());
    AxiosInstance()
      .get('family/getUserFamilies/' + user.id)
      .then(res => {
        setFamilies(res.data);
      })
      .finally(() => {
        dispatch(offLoading());
      });
  };
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      fetchFMFromApi();
    });

    // Cleanup effect
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);
  const margin = [0, 15, 30, 45, 60];
  const outGr = () => {
    if (familyFc) {
      console.log(familyFc._id + '/ removeMember/' + user.id);
      dispatch(showLoading());
      AxiosInstance()
        .delete('family/' + familyFc._id + '/removeMember/' + user.id)
        .then(res => {
          ToastAndroid.show('Rời nhóm thành công', ToastAndroid.SHORT);
        })
        .finally(() => {
          dispatch(offLoading());
        });
    }
  };
  const updateGr = () => {};
  return (
    <AppScreenContainer>
      <EditFamilyModal
        hide={(id?: string, name?: string) => {
          if (id && name) {
            const fmUpdate = families.map(item => {
              if (item._id == id) {
                return {
                  ...item,
                  name: name,
                };
              }
              return item;
            });
            setFamilies(fmUpdate);
          }
          setShowEdit(false);
        }}
        family={familyFc}
        setFamilies={() => {}}
        visible={showEdit}
      />
      <Add_Edit_Modal
        editCus="Đổi tên gia đình"
        onEdit={() => {
          setShowEdit(true);
        }}
        onDelete={() => {
          outGr();
          familyFc &&
            setFamilies(prev => {
              const newArr = prev.filter(item => item._id != familyFc._id);
              return newArr;
            });
        }}
        delCus={'Rời gia đình'}
        visible={showEditModal}
        setStatus={() => {}}
        hide={() => {
          setShowEditModal(false);
        }}
      />
      <AppHeader title={'Danh sách gia đình'} />
      <View
        style={{
          padding: 16,
        }}>
        <ScrollView contentContainerStyle={{gap: 16, paddingBottom: 100}}>
          {families.map((family, index) => {
            const taskTodo = family.tasks.filter(
              task => task.status == TaskStatus.todo,
            ).length;
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(AppStackName.Task, {family: family})
                }
                key={index}
                style={styles.fmCard}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 40,
                  }}>
                  <Text
                    style={{
                      color: '#A1A2A9',
                      fontSize: 12,
                    }}>
                    Gia đình
                  </Text>
                  <IconButton
                    icon="dots-horizontal"
                    iconColor="#A1A2A9"
                    size={20}
                    onPress={() => {
                      setFamilyFc(family);
                      setShowEditModal(true);
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#092642',
                  }}>
                  {family.name}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {family.members.map((item, index) => {
                    if (index < 4) {
                      return (
                        <View
                          key={item._id}
                          style={{
                            backgroundColor: '#B0B3C7',
                            left: margin[index],
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: '#747F9E',
                            position: 'absolute',
                          }}>
                          <Image
                            resizeMode={'cover'}
                            key={index}
                            source={{
                              uri:
                                item.img ??
                                'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png',
                            }}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 20,
                            }}
                          />
                        </View>
                      );
                    }
                    if (index == 4) {
                      return (
                        <View
                          key={index}
                          style={{
                            width: 30,
                            height: 30,
                            left: margin[index],
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: 'white',
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#A1A2A9',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: '500',
                            }}>
                            +{family.members.length - 4}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
                <View style={styles.todoCard}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      textAlign: 'right',
                      color: getCardStatusColor(TaskStatus.todo).txt,
                    }}>{`${taskTodo} Task Todo`}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <FAB
        color={colors.textOnPrimary}
        icon={'plus'}
        size={'medium'}
        onPress={() => setShowAddFamilyModal(true)}
        style={styles.fab}
      />
      <AddFamilyModal
        setFamilies={addFamily}
        hide={() => setShowAddFamilyModal(false)}
        visible={showAddFamilyModal}
      />
    </AppScreenContainer>
  );
};
const useStyle = (colors: any) =>
  StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      backgroundColor: colors.primary,
    },
    todoCard: {
      width: 120,
      backgroundColor: getCardStatusColor(TaskStatus.todo).br,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      position: 'absolute',
      right: 16,
      bottom: 16,
    },
    fmCard: {
      borderRadius: 8,
      height: 120,
      padding: 16,
      backgroundColor: 'white',
      elevation: 2,
    },
  });
export default HomeScreen;
