import React from 'react';
import {StyleSheet, SafeAreaView, Platform, View} from 'react-native';
import {COLORS} from '../../theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {normalize} from '../../common/helpers/responsive';
import AddTaskForm from './components/AddTaskForm';
import AddTaskHeader from './components/AddTaskHeader';

type AddTaskScreen = NativeStackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

type Props = {
  navigation: AddTaskScreen;
};

const AddTaskScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView
      style={[
        styles.body,
        {marginVertical: Platform.OS === 'android' ? normalize(15) : 0},
      ]}>
      <View style={styles.container}>
        <AddTaskHeader navigation={navigation} />
        <AddTaskForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.white,
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
