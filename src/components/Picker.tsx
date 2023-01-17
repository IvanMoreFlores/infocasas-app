import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getMilliseconds, getTime} from '../common/helpers/getTime';
import {normalize} from '../common/helpers/responsive';
import DatePicker from 'react-native-date-picker';
import {getDate} from '../common/helpers/getDate';

type Props = {
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      deadLine: number;
      startTime: number;
      endtime: number;
      remind: number;
      repeat: string;
    }>
  >;
  data: {
    title: string;
    deadLine: number;
    startTime: number;
    endtime: number;
    remind: number;
    repeat: string;
  };
  type?: boolean;
  mode: string;
};

const Picker = ({setData, data, type, mode}: Props) => {
  const [show, setShow] = useState(false);

  const onChangeTime = (selectedDate?: Date) => {
    const currentDate =
      selectedDate || new Date(type ? data.startTime : data.endtime);
    const milliseconds = getMilliseconds(currentDate, data.deadLine);
    !type && setData({...data, endtime: milliseconds});
    type && setData({...data, startTime: milliseconds});
    setShow(false);
  };

  const onChangeDate = (selectedDate?: Date) => {
    const currentDate = selectedDate || new Date(data.deadLine);
    setData({...data, deadLine: Date.parse(currentDate.toISOString())});
    setShow(false);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={{width: '100%'}}>
      <Pressable style={styles.pressable} onPress={showTimepicker}>
        <Text style={styles.text}>
          {mode === 'date'
            ? getDate(new Date(data.deadLine))
            : getTime(new Date(type ? data.startTime : data.endtime))}
        </Text>
        <Icon name="clock" color={COLORS.black38} size={normalize(15)} />
      </Pressable>
      <DatePicker
        modal
        locale="en"
        open={show}
        date={new Date(type ? data.startTime : data.endtime)}
        mode={mode}
        onConfirm={(date: any) => {
          mode === 'date' ? onChangeDate(date) : onChangeTime(date);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(10),
  },
  text: {
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    height: normalize(40),
    lineHeight: normalize(40),
    textAlignVertical: 'center',
  },
});
