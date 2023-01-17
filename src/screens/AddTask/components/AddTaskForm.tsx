import React, {Dispatch, PropsWithChildren, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {COLORS, FONT_SIZE, letterSpacing} from '../../../theme';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Picker from '../../../components/Picker';
import Select from '../../../components/Select';
import {remind, repeat} from '../../../common/data/data';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/RootStackParamList';
import {connect, DispatchProp, Matching} from 'react-redux';
import {Action, AnyAction, CombinedState} from 'redux';
import {actions} from '../../../contexts/reduxConfig';
import {getRandomColor} from '../../../common/helpers/colorHelper';
import {normalize} from '../../../common/helpers/responsive';
import SceneName from '../../../navigation/SceneNames';
import Button from '../../../components/Button';

type AddTaskForm = NativeStackNavigationProp<
  RootStackParamList,
  SceneName.AddTaskForm
>;

type Props = {
  navigation: AddTaskForm;
  dispatch: Dispatch<Action>;
  pendingTasks: [];
};

type otherProp = PropsWithChildren<
  Matching<{pendingTasks: [] | undefined} & DispatchProp<AnyAction>, Props>
>;

const today = Date.parse(new Date().toISOString());

const initialValues = {
  title: '',
  deadLine: today,
  startTime: today,
  endtime: today,
  remind: 10,
  repeat: 'Weekly',
};

const AddTaskForm = ({
  dispatch,
  navigation,
  pendingTasks,
  ...props
}: otherProp) => {
  const [showRemind, setShowRemind] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [data, setData] = useState(initialValues);
  const [isFocus, setIsFocus] = useState(false);

  const sendTask = () => {
    pendingTasks &&
      data.title &&
      dispatch(
        actions.addPendingTask([
          ...pendingTasks,
          {
            ...data,
            create: Date.parse(new Date().toISOString()),
            color: getRandomColor(),
          },
        ]),
      );
    if (data.title) {
      alert('Task created!');
      navigation.navigate(SceneName.HomeScreen);
    } else {
      alert('You must add a title');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: normalize(20)}}>
          <View style={{marginTop: normalize(15)}}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={data.title}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChangeText={text => setData({...data, title: text})}
            />
          </View>
          <View style={{marginTop: normalize(15)}}>
            <Text style={styles.inputLabel}>Deadline</Text>
            <Picker setData={setData} data={data} mode="date" />
          </View>
          <View
            style={{
              marginTop: normalize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '45%'}}>
              <Text style={styles.inputLabel}>Start time</Text>
              <Picker setData={setData} data={data} type={true} mode="time" />
            </View>
            <View style={{width: '45%'}}>
              <Text style={styles.inputLabel}>End time</Text>
              <Picker setData={setData} data={data} mode="time" />
            </View>
          </View>
          <View style={{marginTop: normalize(15)}}>
            <Text style={styles.inputLabel}>Remind</Text>
            <Select
              setShow={setShowRemind}
              show={showRemind}
              options={remind}
              height={normalize(130)}
              text={'minutes early'}
              setData={setData}
              data={data}
            />
          </View>
          <View style={{marginTop: normalize(15)}}>
            <Text style={styles.inputLabel}>Repeat</Text>
            <Select
              setShow={setShowRepeat}
              show={showRepeat}
              options={repeat}
              height={normalize(60)}
              setData={setData}
              data={data}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button
          onPress={sendTask}
          type="primary"
          size="large"
          label="Create a Task"
          rounded="large"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

type stateProps = CombinedState<{pendingTasks: {pendingTasks: []}}> | undefined;

const mapStateToProps = (state: stateProps) => ({
  pendingTasks: state?.pendingTasks.pendingTasks,
});
export default connect(mapStateToProps)(AddTaskForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    // marginBottom:30,
  },
  inputLabel: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.normal,
    fontWeight: '700',
    letterSpacing: letterSpacing,
  },
  input: {
    backgroundColor: COLORS.gray,
    borderRadius: normalize(10),
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    height: normalize(40),
    paddingHorizontal: normalize(10),
  },
});
