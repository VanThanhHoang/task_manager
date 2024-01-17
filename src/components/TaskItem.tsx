// TaskItem.tsx

import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper'; // Import your IconButton component
import AddTaskModal, {
  getCardStatusColor,
  getStatus,
  getTaskColor,
  TaskStatus,
} from '../components/modal/AddTaskModal'; // Import your utility functions
import {Task} from '../global';
import {formatDDMMYY} from '../utils/stringFormatter';

interface TaskItemProps {
  task: Task; // Replace YourTaskType with the actual type of your task object
  setTaskFocus: (task: Task) => void; // Replace YourTaskType with the actual type
  setShowEditModal: (show: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  setTaskFocus,
  setShowEditModal,
}) => {
  const margin = [0, 15, 45, 60];

  return (
    <View
      style={[
        styles.taskContainer,
        {borderLeftColor: getTaskColor(task.status as TaskStatus)},
      ]}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <IconButton
            icon="dots-horizontal"
            iconColor="#A1A2A9"
            size={20}
            onPress={() => {
              setTaskFocus(task);
              setShowEditModal(true);
            }}
          />
        </View>
        <Text style={styles.date}>{`Ngày bắt đầu: ${formatDDMMYY(
          task.timeStart,
        )}`}</Text>
        <Text style={styles.date}>{`Ngày đến hạn ${formatDDMMYY(
          task.timeEnd,
        )}`}</Text>
        <View style={styles.membersContainer}>
          {task.members.map((item, index) => {
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
            if (index === 4) {
              return (
                <View key={index} style={styles.moreMembersContainer}>
                  <Text style={styles.moreMembersText}>{`+${
                    task.members.length - 4
                  }`}</Text>
                </View>
              );
            }
          })}
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: getCardStatusColor(task.status as TaskStatus)
                  .br,
              },
            ]}>
            <Text
              style={[
                styles.statusText,
                {color: getCardStatusColor(task.status as TaskStatus).txt},
              ]}>
              {getStatus(task.status as TaskStatus)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add any additional styles for the container if needed
  },
  taskContainer: {
    height: 140,
    backgroundColor: 'white',
    borderRadius: 4,
    borderLeftWidth: 4,
    flexDirection: 'row',
  },
  innerContainer: {
    flex: 1,
    marginLeft: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#092642',
    fontSize: 16,
    fontWeight: '800',
  },
  date: {
    color: '#A1A2A9',
    fontSize: 14,
    fontWeight: '500',
  },
  membersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    left: 5,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
  },
  moreMembersContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1A2A9',
  },
  moreMembersText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  statusContainer: {
    width: 120,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    position: 'absolute',
    right: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default TaskItem;
