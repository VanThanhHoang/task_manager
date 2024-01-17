import { StyleSheet } from "react-native";
import { AppThemeColors } from "../../themes";
import { TaskColors } from ".";

export const useStyles = (colors: AppThemeColors) =>
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


export const filterTasks = [
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