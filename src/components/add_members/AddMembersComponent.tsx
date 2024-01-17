import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {User} from '../../global';
import React from 'react';
import {useTheme} from '../../hooks';

type AddMembersComponentProps = {
  setShowSelectMembers: (show: boolean) => void;
  member: User[];
  setMember: (member: User[]) => void;
};
const AddMembersComponent = ({
  setShowSelectMembers,
  setMember,
  member,
}: AddMembersComponentProps) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  return (
    <View>
      <Text style={styles.label}>Thành viên</Text>

      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 8,
          width: '100%',
        }}>
        <IconButton
          style={{
            borderRadius: 8,
            backgroundColor: colors.button,
            height: 40,
          }}
          iconColor={colors.primary}
          icon="plus"
          onPress={() => setShowSelectMembers(true)}
        />
        {member.map((item: User) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setMember(member.filter((i: User) => i._id !== item._id));
              }}
              key={item._id}
              style={{
                gap: 12,
                flexDirection: 'row',
                padding: 8,
                width: 'auto',
                backgroundColor: colors.button,
                borderRadius: 4,
                alignItems: 'center',
                marginVertical: 4,
              }}>
              <Image
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
              <Text
                style={{
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                {item.userName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default AddMembersComponent;
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
