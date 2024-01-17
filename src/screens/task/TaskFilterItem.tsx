import {View} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import TaskItem from '../../components/TaskItem';
export const TaskFilterItem = ({
  ...props
}: {
  isSelect: boolean;
  count: number;
  name: string;
  color: string;
  onPress: () => void;
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
    </TouchableOpacity>
  );
};
