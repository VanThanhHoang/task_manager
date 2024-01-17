import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppThemeColors } from "../../themes";
import { useTheme } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const AvatarContainer = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{
        uri: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
      }} />
    <TouchableOpacity style={{ width: 180 }}>
      <FontAwesomeIcon
        size={25}
        style={{
          position: "absolute",
          right:10,
          bottom:0
        }}
        color={colors.primary}
        icon={faPenToSquare} />
    </TouchableOpacity>
  </View>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    height: 200,
    alignItems: "center"
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 90
  }
});
