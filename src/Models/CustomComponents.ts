import {TextInputProps, ButtonProps} from 'react-native';

// Custom Button
export interface CustomButtonProps extends ButtonProps {
  btnStyles: Object | undefined;
  textStyles: Object | undefined;
}

// Custom TextInput
export interface CustomInputFieldProps extends TextInputProps {
  icon: string;
  type: 'password' | undefined;
  styles: Object | undefined;
}

// Custom Loading Spinner
export interface CustomLoadingSpinnerProps {
  isLoading: boolean;
}
