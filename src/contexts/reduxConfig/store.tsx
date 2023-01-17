// import AsyncStorage from '@react-native-community/async-storage';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './';

const persistConfig = {
  key: 'root2',
  keyPrefix: '',
  storage: AsyncStorage,
  whitelist: ['pendingTasks', 'doneTasks'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined);

export const persistor = persistStore(store);
