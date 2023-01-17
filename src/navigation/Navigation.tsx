import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import AddTaskScreen from '../screens/AddTask/AddTaskScreen';
import SceneName from './SceneNames';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SceneName.HomeScreen}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SceneName.AddTaskScreen}
          component={AddTaskScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;