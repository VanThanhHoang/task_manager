import {AppScreenContainer} from '../../layout';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  FlatList,
  ScrollView,
  View,
  RefreshControl,
} from 'react-native';
import {useTheme} from '../../hooks';
import {AppThemeColors} from '../../themes';
import React, {useEffect, useState} from 'react';
import {
  offLoading,
  showLoading,
  useAppDispatch,
  useAppSelector,
} from '../../redux';
import {AppHeader} from '../../components/header/AppHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Family, Task, User} from '../../global';
import {Appbar, FAB, IconButton} from 'react-native-paper';
import AddTaskModal, {TaskStatus} from '../../components/modal/AddTaskModal';
import {formatDDMMYY} from '../../utils/stringFormatter';
import AxiosInstance from '../../utils/AxiosInstance';
import AddMembersComponent from '../../components/add_members/AddMembersComponent';
import SelectMembersModal from '../../components/modal/SelectMembersModal';
import Add_Edit_Modal from '../../components/modal/Add_Edit_Modal';
import TaskItem from '../../components/TaskItem';
import {
  AppNavigationProp,
  AppStackName,
} from '../../navigations/AppNavigation/config';
export enum TaskColors {
  todo = '#FFC107',
  doing = '#2196F3',
  done = '#4CAF50',
}

const filterTasks = [
  {
    name: 'Cv của tôi',
    color: TaskColors.todo,
    count: 0,
    status: 'myTask',
  },
  {
    name: 'Cần làm',
    color: TaskColors.todo,
    count: 5,
    status: 'todo',
  },
  {
    name: 'Đang làm',
    color: TaskColors.doing,
    count: 5,
    status: 'doing',
  },
  {
    name: 'Đã làm',
    color: TaskColors.done,
    count: 5,
    status: 'complete',
  },
];
const TaskScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const {user} = useAppSelector(state => state.root.user);
  const {family: props} = useRoute().params as {family: Family};
  const [family, setFamily] = useState<Family>(props);
  const {colors} = useTheme();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [tasks, setTask] = useState<Task[]>([]);
  const [tasksFilter, setTaskFilter] = useState<Task[]>([]);
  const dispatch = useAppDispatch();
  const styles = useStyles(colors);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModalAddMembers, setShowModalAddMembers] = useState(false);
  const [taskFocus, setTaskFocus] = useState<Task>();
  const [filterStatus, setFilterStatus] = useState<TaskStatus | undefined>(
    undefined,
  );
  const updateUserFamily = () => {
    dispatch(showLoading());
    AxiosInstance()
      .post('family/addMembers/add/' + family._id, {
        members: family.members,
      })
      .then(res => {
        setFamily(res.data);
      })
      .finally(() => {
        dispatch(offLoading());
      });
  };

  useEffect(() => {
    if (filterStatus) {
      if (filterStatus == 'myTask') {
        setTaskFilter(
          tasks.filter((task: Task) =>
            task.members.some(member => member._id === user.id),
          ),
        );
      } else {
        setTaskFilter(
          tasks.filter((task: Task) => task.status === filterStatus),
        );
      }
    } else {
      setTaskFilter(tasks);
    }
  }, [filterStatus]);
  const deleteTask = (task: Task) => {
    dispatch(showLoading());
    AxiosInstance()
      .delete('task/' + task._id + '/delete')
      .then(res => {
        setTask(tasks.filter(item => item._id !== task._id));
        ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
      })
      .finally(() => {
        dispatch(offLoading());
      });
  };
  const rightAction = () => {
    return (
      <Appbar.Action
        onPress={() => {
          setShowModalAddMembers(true);
        }}
        color={colors.primary}
        icon={'account-multiple-plus-outline'}
      />
    );
  };
  useEffect(() => {
    dispatch(showLoading());
    AxiosInstance()
      .get('family/' + family._id)
      .then(res => {
        setTask(res.data.tasks);
        setFamily(res.data);
        setTaskFilter(res.data.tasks);
      })
      .finally(() => {
        dispatch(offLoading());
      });
  }, []);
  const [rf, setRf] = useState<boolean>(false);
  const onRefresh = () => {
    setRf(true);
    AxiosInstance()
      .get('family/' + family._id)
      .then(res => {
        setTask(res.data.tasks);
        setFamily(res.data);
        setTaskFilter(res.data.tasks);
      })
      .finally(() => {
        setRf(false);
      });
  };

  return (
    <AppScreenContainer>
      <Add_Edit_Modal
        onEdit={() => {
          setShowEditTask(true);
        }}
        onDelete={() => {
          taskFocus && deleteTask(taskFocus);
        }}
        visible={showEditModal}
        setStatus={() => {}}
        hide={() => {
          setShowEditModal(false);
        }}
      />
      <AddTaskModal
        updateTask={(task: Task) => {
          onRefresh();
        }}
        task={taskFocus}
        familyMembers={family.members}
        hide={() => {
          setShowEditTask(false);
          setTaskFocus(undefined);
        }}
        setTask={(t: Task) => {}}
        familyId={family._id}
        visible={showEditTask}
      />
      <AppHeader
        showBackButton
        title={'DS công việc - ' + family.name}
        action={rightAction()}
      />
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingBottom: 0,
        }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={rf} onRefresh={onRefresh} />
          }
          style={{maxHeight: 50}}
          contentContainerStyle={{gap: 16}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {filterTasks.map((item, index) => {
            return (
              <TaskFilterItem
                showCount={item.status != TaskStatus.myTask}
                isSelect={filterStatus === item.status}
                key={index}
                name={item.name}
                color={item.color}
                count={
                  tasks.filter((task: Task) => task.status === item.status)
                    .length
                }
                onPress={() => {
                  if (filterStatus === item.status) {
                    setFilterStatus(undefined);
                  } else {
                    setFilterStatus(item.status as TaskStatus);
                  }
                }}
              />
            );
          })}
        </ScrollView>
        <FlatList
          data={tasksFilter}
          keyExtractor={(item, index) => item._id}
          renderItem={({item, index}) => (
            <TaskItem
              key={item._id}
              task={item}
              setTaskFocus={setTaskFocus}
              setShowEditModal={() => setShowEditModal(true)}
            />
          )}
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 16, paddingBottom: 100}}
        />
        <FAB
          collapsable={true}
          mode={'elevated'}
          color={colors.textOnPrimary}
          icon={'plus'}
          size={'medium'}
          onPress={() => setShowAddTask(true)}
          style={styles.fab}
        />
        <FAB
          collapsable={true}
          mode={'elevated'}
          icon={'message-settings-outline'}
          color={colors.textOnPrimary}
          size={'medium'}
          onPress={() =>
            navigation.navigate(AppStackName.ChatScreen, {family: family})
          }
          style={styles.fab2}
        />
        <AddTaskModal
          familyMembers={family.members}
          hide={() => setShowAddTask(false)}
          setTask={(t: Task) => {
            setTask([...tasks, t]);
            setTaskFilter([...tasks, t]);
            console.log(tasksFilter.length);
          }}
          familyId={family._id}
          visible={showAddTask}
        />

        <SelectMembersModal
          memberSelected={family.members}
          visible={showModalAddMembers}
          setMembers={(members: User[]) => {
            setFamily({...family, members: members});
          }}
          hide={() => {
            updateUserFamily();
            setShowModalAddMembers(false);
          }}
        />
      </View>
    </AppScreenContainer>
  );
};

const TaskFilterItem = ({
  ...props
}: {
  isSelect: boolean;
  count: number;
  name: string;
  color: string;
  onPress: () => void;
  showCount: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: props.isSelect ? '#e7ecf2' : 'white',
        borderBottomWidth: 1,
        borderColor: '#ECECEC',
        paddingHorizontal: 14,
        height: 40,
        maxWidth: 150,
        borderWidth: 1,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
      <Text
        style={{
          color: '#292C38',
          fontWeight: '400',
          fontSize: 14,
        }}>
        {props.name}
      </Text>
      {props.showCount && (
        <View
          style={{
            backgroundColor: props.color,
            width: 25,
            height: 25,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            {props.count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
const useStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    notiContainer: {
      borderRadius: 8,
      elevation: 2,
      backgroundColor: colors.itemBackground,
      marginTop: 8,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      minHeight: 80,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 16,
      color: colors.text,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      backgroundColor: colors.primary,
    },
    fab2: {
      position: 'absolute',
      margin: 16,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      backgroundColor: colors.primary,
    },
  });

export default TaskScreen;
