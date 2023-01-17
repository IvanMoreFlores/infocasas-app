import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Platform} from 'react-native';
import {COLORS, FONT_SIZE, letterSpacing} from '../../theme';
import HomeHeader from './components/HomeHeader';
import CompletedTasks from './components/CompletedTasks';
import PendingTasks from './components/PendingTasks';
import SceneName from '../../navigation/SceneNames';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {normalize} from '../../common/helpers/responsive';
import Button from '../../components/Button';
import Switch from '../../components/Switch';

type HomeScreen = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreen;
};

const HomeScreen = ({navigation}: Props) => {
  const [filter, setFilter] = useState(false);

  const onFilter = () => {
    setFilter(!filter);
  };

  return (
    <SafeAreaView
      style={[
        styles.body,
        {marginVertical: Platform.OS === 'android' ? normalize(15) : 0},
      ]}>
      <View style={[styles.container]}>
        <View style={{flex: 1}}>
          <HomeHeader />
          <Switch text="See all" status={false} onPress={onFilter} />
          <View style={{marginHorizontal: normalize(20)}}>
            {!filter ? (
              <CompletedTasks />
            ) : (
              <>
                <CompletedTasks />
                <PendingTasks navigation={navigation} />
              </>
            )}
          </View>
        </View>
        <View style={styles.button}>
          <Button
            onPress={async () => navigation.navigate(SceneName.AddTaskScreen)}
            type="primary"
            size="large"
            label="Add a task"
            rounded="large"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.white,
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
  },
  todoApp: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '600',
    letterSpacing: letterSpacing,
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
  },
});
