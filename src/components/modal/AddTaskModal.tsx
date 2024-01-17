import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {AppHeader} from '../header/AppHeader';
import {AppButton} from '../button/AppButton';
import {useTheme} from '../../hooks';
import {AppTextInput} from '../text_input/AppTextInput';
import SelectMembersModal from './SelectMembersModal';
import {Task, User} from '../../global';
import {
  offLoading,
  showLoading,
  useAppDispatch,
  useAppSelector,
} from '../../redux';
import AxiosInstance from '../../utils/AxiosInstance';
import AddMembersComponent from '../add_members/AddMembersComponent';
import DatePicker from 'react-native-date-picker';
import {formatDDMMYY} from '../../utils/stringFormatter';
import SetStatusModal from './SelectStatusModal';
import {TaskColors} from '../../screens/task';
import {ScrollView} from 'react-native-gesture-handler';
import {AppScreenContainer} from '../../layout';

export enum TaskStatus {
  todo = 'todo',
  doing = 'doing',
  complete = 'complete',
  myTask = 'myTask',
}

type AddPaymentModalProps = {
  task?: Task;
  familyId: string;
  visible: boolean;
  hide: () => void;
  setTask: (task: Task) => void;
  familyMembers?: User[];
  updateTask?: (task: Task) => void;
};
export const getTaskColor = (status: TaskStatus) => {
  if (status == TaskStatus.todo) return TaskColors.todo;
  if (status == TaskStatus.doing) return TaskColors.doing;
  return TaskColors.done;
};
export const getStatus = (status: TaskStatus) => {
  if (status == TaskStatus.todo) return 'Việc cần làm';
  if (status == TaskStatus.doing) return 'Đang làm';
  return 'Đã hoàn thành';
};
export const getCardStatusColor = (status: TaskStatus) => {
  if (status == TaskStatus.todo)
    return {
      br: '#f8f1e8',
      txt: '#c16b1b',
    };
  if (status == TaskStatus.doing)
    return {
      br: '#e7ecf2',
      txt: '#274f80',
    };
  return {
    br: '#EAF5EC',
    txt: '#309F51',
  };
};

const AddTaskModal = ({
  visible,
  hide,
  setTask,
  familyId,
  familyMembers,
  task,
  updateTask,
}: AddPaymentModalProps) => {
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.todo);
  const {colors} = useTheme();
  const [name, setName] = React.useState(task?.title ? task.title : '');
  const [des, setDes] = React.useState(task?.detail ?? '');
  const [open, setOpen] = useState(false);
  const [timeStart, setTimeStart] = React.useState(
    task?.timeStart ?? new Date(),
  );
  const [timeEnd, setTimeEnd] = React.useState(task?.timeEnd ?? new Date());
  const [openTimeStart, setOpenTimeStart] = React.useState(false);
  const [openTimeEnd, setOpenTimeEnd] = React.useState(false);
  const dispatch = useAppDispatch();
  const [image, setImage] = React.useState('');
  const [member, setMember] = React.useState<User[]>(task?.members ?? []);
  const [showSelectMembers, setShowSelectMembers] = React.useState(false);
  const styles = useStyles(colors);
  const {user} = useAppSelector(state => state.root.user);
  const validateTaskForm = () => {
    if (!name.trim()) {
      Alert.alert('Vui lòng nhập tên công việc');
      return false;
    }
    if (!timeStart || !timeEnd) {
      Alert.alert('Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc');
      return false;
    }
    const startDate = new Date(timeStart).getTime();
    const endDate = new Date(timeEnd).getTime();
    if (endDate <= startDate) {
      Alert.alert('Ngày kết thúc phải lớn hơn ngày bắt đầu');
      return false;
    }
    return true;
  };

  const addTask = () => {
    if (!validateTaskForm()) return;
    dispatch(showLoading());
    const baseUrl = task ? `task/${task._id}/update` : 'task/create';
    AxiosInstance()
      .post(baseUrl, {
        title: name,
        detail: des,
        timeStart: timeStart,
        timeEnd: timeEnd,
        status: status,
        members: member,
        familyId: familyId,
        createBy: {
          _id: user.id,
          ...user,
        },
      })
      .then(res => {
        updateTask && updateTask(res.data);
        if (!task) {
          setTask(res.data);
        }
        ToastAndroid.show(
          task ? 'Cập nhật thành công' : 'Thêm công việc thành công',
          ToastAndroid.SHORT,
        );
        setName('');
        setImage('');
        setMember([]);
        hide();
      })
      .finally(() => {
        dispatch(offLoading());
        hide();
      });
  };
  useEffect(() => {
    if (task) {
      setName(task.title);
      setDes(task?.detail ?? '');
      setTimeStart(new Date(task.timeStart));
      setTimeEnd(new Date(task.timeEnd));
      setStatus((task?.status as TaskStatus) ?? TaskStatus.todo);
      setMember(task.members);
    }
  }, [task]);
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
        title={task ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
      />
      <AppScreenContainer customStyles={{padding: 16}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps={'always'}
          style={{
            backgroundColor: colors.background,
            flex: 1,
          }}
          contentContainerStyle={styles.container}>
          <AppTextInput
            value={name}
            onTextChange={setName}
            placeHolder={'Nhập tiêu đề công việc '}
            label={'Tiêu đề'}
          />
          <AppTextInput
            multiline
            value={des}
            onTextChange={setDes}
            placeHolder={'Mô tả thêm về công việc'}
            label={'Mô tả'}
          />
          <AddMembersComponent
            setShowSelectMembers={setShowSelectMembers}
            member={member}
            setMember={(member: User[]) => {
              setMember(member);
            }}
          />
          <AppTextInput
            onPress={() => {
              setOpenTimeStart(true);
            }}
            value={formatDDMMYY(timeStart)}
            keyboardType={'numeric'}
            modalTextInput={true}
            onTextChange={setDes}
            placeHolder={'Ngày bắt đầu công việc'}
            label={'Ngày bắt đầu'}
          />
          <AppTextInput
            value={formatDDMMYY(timeEnd)}
            onPress={() => {
              setOpenTimeEnd(true);
            }}
            onTextChange={setDes}
            keyboardType={'numeric'}
            modalTextInput={true}
            placeHolder={'Ngày kết thúc công việc'}
            label={'Ngày kết thúc'}
          />
          <AppTextInput
            onPress={() => {
              setShowStatusModal(true);
            }}
            textColor={getTaskColor(status)}
            value={getStatus(status)}
            onTextChange={setDes}
            keyboardType={'numeric'}
            modalTextInput={true}
            placeHolder={'Trạng thái hoàn thành'}
            label={'Trạng thái'}
          />
          <AppButton label={task ? 'Lưu' : 'Thêm'} onPress={addTask} />
          <View style={{height: 500}} />
        </ScrollView>
        <DatePicker
          modal
          open={openTimeStart}
          date={timeStart}
          mode={'datetime'}
          onConfirm={date => {
            setOpenTimeEnd(false);
            setTimeStart(date);
          }}
          onCancel={() => {
            setOpenTimeStart(false);
          }}
        />
        <DatePicker
          modal
          open={openTimeEnd}
          date={timeEnd}
          mode={'datetime'}
          onConfirm={date => {
            setOpenTimeEnd(false);
            setTimeEnd(date);
          }}
          onCancel={() => {
            setOpenTimeEnd(false);
          }}
        />
        <SetStatusModal
          status={status}
          visible={showStatusModal}
          setStatus={setStatus}
          hide={() => {
            setShowStatusModal(false);
          }}
        />
        <SelectMembersModal
          addTask
          familyMembers={familyMembers}
          memberSelected={member}
          visible={showSelectMembers}
          setMembers={setMember}
          hide={() => {
            setShowSelectMembers(false);
          }}
        />
      </AppScreenContainer>
    </Modal>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      gap: 16,
    },
    label: {
      fontWeight: '700',
      color: colors.primary,
      fontSize: 16,
    },
  });

export default AddTaskModal;
