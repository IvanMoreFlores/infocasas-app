import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../theme';

const SIZES = ['small', 'medium', 'large'];
const TYPES = [
  'primary',
  'secondary',
  'accent',
  'error',
  'warning',
  'info',
  'success',
];
const ROUNDED = ['small', 'medium', 'large'];

type Props = {
  children?: any;
  onPress: any;
  type?: string | any;
  size?: string | any;
  label?: string | any;
  rounded?: string | any;
};

export default function Button({
  children,
  onPress,
  type,
  size,
  label,
  rounded,
}: Props) {
  const btnSize = SIZES.includes(size) ? size : 'small';
  const btnType = TYPES.includes(type) ? type : 'primary';
  const btnRound = ROUNDED.includes(rounded) ? rounded : 'small';

  const btnStyle = StyleSheet.create({
    btn: {
      height: 50,
      width: btnSize === 'large' ? '80%' : btnSize === 'medium' ? 210 : 'auto',
      borderRadius: btnRound === 'small' ? 5 : btnRound === 'medium' ? 10 : 20,
      marginVertical: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        btnType === 'primary'
          ? COLORS.primary
          : btnType === 'secondary'
          ? COLORS.secondary
          : btnType === 'accent'
          ? COLORS.accent
          : btnType === 'error'
          ? COLORS.error
          : btnType === 'warning'
          ? COLORS.warning
          : btnType === 'info'
          ? COLORS.info
          : COLORS.success,

      shadowColor:
        btnType === 'primary'
          ? COLORS.primary
          : btnType === 'secondary'
          ? COLORS.secondary
          : btnType === 'accent'
          ? COLORS.accent
          : btnType === 'error'
          ? COLORS.error
          : btnType === 'warning'
          ? COLORS.warning
          : btnType === 'info'
          ? COLORS.info
          : COLORS.success,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.9,
      shadowRadius: 8,
    },
  });

  return (
    <TouchableOpacity style={btnStyle.btn} onPress={onPress}>
      <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
