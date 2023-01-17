import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS, FONT_SIZE} from '../theme';
import {normalize} from '../common/helpers/responsive';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  options: string[] | number[];
  height: number;
  text?: string | undefined;
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
};

const WIDTH = Dimensions.get('window').width;
const Select = ({
  setShow,
  show,
  options,
  height,
  text,
  data,
  setData,
}: Props) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const changeModalVisibility = (bool: boolean) => {
    setisModalVisible(bool);
  };
  const onPressItem = (item: any) => {
    changeModalVisibility(false);
    typeof item === 'number' && setData({...data, remind: item});
    typeof item !== 'number' && setData({...data, repeat: item});
    setShow(false);
  };
  const option = options.map((item, index) => {
    return (
      <TouchableOpacity
        style={
          data &&
          (typeof item === 'number' ? data.remind : data.repeat) === item
            ? styles.option_select
            : styles.option
        }
        key={index}
        onPress={() => onPressItem(item)}>
        <Text
          style={
            data &&
            (typeof item === 'number' ? data.remind : data.repeat) === item
              ? styles.optionText_select
              : styles.optionText
          }>{`${item} ${text ? text : ''}`}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={{
        borderRadius: normalize(10),
        marginBottom: typeof options[0] !== 'number' ? normalize(10) : 0,
      }}>
      <View>
        <TouchableOpacity
          style={styles.select}
          onPress={() => changeModalVisibility(true)}>
          <Text style={styles.dataText}>{`${
            typeof options[0] === 'number' ? data.remind : data.repeat
          } ${text ? text : ''}`}</Text>
          <Icon
            name={!isModalVisible ? 'chevron-down' : 'chevron-up'}
            color={COLORS.black38}
            size={normalize(15)}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => changeModalVisibility(false)}>
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => {
            changeModalVisibility(false);
          }}>
          <View
            style={[
              styles.modalView,
              {
                width: WIDTH - 40,
                // height: data.length > 6 ? HEIGHT / 2 : HEIGHT / 3,
              },
            ]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {option}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  select: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: normalize(10),
    marginTop: normalize(3),
    textAlignVertical: 'center',
    paddingHorizontal: normalize(10),
  },
  optionText_select: {
    color: COLORS.white,
    fontSize: FONT_SIZE.small,
  },
  optionText: {
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    marginTop: normalize(3),
    textAlignVertical: 'center',
    paddingHorizontal: normalize(10),
  },
  dataText: {
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    height: normalize(40),
    lineHeight: normalize(40),
    marginBottom: normalize(5),
    paddingHorizontal: normalize(10),
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  view: {
    backgroundColor: COLORS.gray,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(1,1,1,0.5)',
  },
  modalView: {
    // paddingTop: 10,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  option_select: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
