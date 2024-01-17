import { ColorValue } from "react-native";

export type Color = string
export interface AppThemeColors {
  primary:Color,
  text:Color,
  textOnPrimary:Color,
  subText:Color,
  background:Color,
  itemBackground:Color,
  itemText:Color,
  button:Color
}
export const HOT_COLOR :AppThemeColors = {
  primary:"#174276",
  text:'#010100',
  textOnPrimary:'#f9f3f5',
  subText:'#8b969d',
  background:'#F9F9F9',
  itemBackground:'#c2c8cd',
  itemText:'#424343',
  button:'#ECECEC'
}
export const COLD_COLOR:AppThemeColors = {
  primary:'#ffd901',
  text:'#fcfcfd',
  textOnPrimary:'#121001',
  subText:'#4c5862',
  background:'#14212f',
  itemBackground:'#121a22',
  itemText:'#bcbdbc',
    button:'#ECECEC'
}
