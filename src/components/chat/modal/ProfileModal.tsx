import React from "react";
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text, ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import { AppHeader } from "../header/AppHeader";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCakeCandles, faCopy, faLink, faPhone } from "@fortawesome/free-solid-svg-icons";
import Clipboard from '@react-native-clipboard/clipboard';
type ResidentModalProps = {
  visible: boolean,
  id: string,
  hideModal: () => void
}
export const ResidentModal = ({ ...props }: ResidentModalProps) => {

  const { colors } = useTheme();
  const  styles = useStyles(colors)
  return <Modal
    animationType={"slide"}
    visible={props.visible}
    style={{ flex: 1 }}>
    <StatusBar translucent />
    <AppHeader
      showBackButton
      backPress={props.hideModal}
      title={"Nguyễn Văn A - P5T8"} />
    <View style={{ flex: 1, padding: 16 ,gap:24}}>
      <Image
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          alignSelf: "center"
        }}
        source={{
          uri: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_9.jpg"
        }}
      />
      <Text style={styles.textInfo}>Boycodon</Text>
      <Text style={{
        ...styles.textInfo2,
        textAlign:'center',
        fontWeight:'normal',
        fontSize:16
      }}>Trai ngheo voi trai tim vang ^^</Text>
      <View style={styles.infoContainer}>
        <View style={{flexDirection:"row",alignItems:'center',gap:8}}>
         <FontAwesomeIcon icon={faCakeCandles}/>
          <Text style={styles.textInfo2}>5/6/2002</Text>
        </View>
        <View style={{flexDirection:"row",alignItems:'center',gap:8}}>
          <FontAwesomeIcon icon={faPhone}/>
          <Text style={styles.textInfo2}>012345689</Text>
          <TouchableOpacity onPress={()=>{
            Clipboard.setString("fb.com/2452")
            ToastAndroid.show('Đã sao chép vào clipboard',ToastAndroid.SHORT)
          }}>
            <FontAwesomeIcon icon={faCopy}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",alignItems:'center',gap:8}}>
          <FontAwesomeIcon icon={faLink}/>
          <Text style={styles.textInfo2}>fb.com/2452</Text>
          <TouchableOpacity onPress={()=>{
           Clipboard.setString("fb.com/2452")
            ToastAndroid.show('Đã sao chép vào clipboard',ToastAndroid.SHORT)
          }}>
            <FontAwesomeIcon icon={faCopy}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  infoContainer:{
    alignItems:'flex-start',
    justifyContent:'center',
    gap:16,
    alignSelf:'center'
  },
  textInfo:{
    fontWeight:'bold',
    fontSize:22,
    color:colors.primary,
    textAlign:'center'
  },
  textInfo2:{
    fontWeight:'bold',
    fontSize:18,
    color:colors.text
  }
});
