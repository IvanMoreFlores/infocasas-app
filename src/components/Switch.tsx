import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../common/helpers/responsive';
import {COLORS, FONT_SIZE} from '../theme';

type Props = {
  status: true | false;
  text?: string | any;
  direction?: 'row' | 'row-reverse';
  align?: 'flex-start' | 'flex-end' | 'center';
  onPress?: any;
};

const Switch = ({status, text, onPress}: Props) => {
  const [getStatus, setStatus] = useState(status);

  const onChange = () => {
    setStatus(!getStatus);
    onPress();
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: normalize(20),
      paddingVertical: normalize(20),
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
    },
    check: {
      height: 24,
      width: 42,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      marginRight: normalize(10),
    },
    ovalo: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: getStatus ? 'flex-end' : 'flex-start',
      height: 14,
      width: 42,
      backgroundColor: getStatus ? '#FEF4E6' : '#E4E4E4',
      borderRadius: 24,
    },
    circle: {
      alignItems: 'center',
      height: 24,
      width: 24,
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      borderWidth: 7,
      borderColor: getStatus ? '#FF9908' : '#BDBDBD',
    },

    text: {
      color: COLORS.black87,
      fontSize: FONT_SIZE.large,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      {text && (
        <View style={styles.title}>
          <Text style={styles.text}>See all</Text>
        </View>
      )}
      <TouchableOpacity onPress={onChange}>
        <View style={styles.check}>
          <View style={styles.ovalo}>
            <View style={styles.circle} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Switch;
