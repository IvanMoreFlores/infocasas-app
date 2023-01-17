/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/contexts/reduxConfig/store';
import Navigation from './src/navigation/Navigation';

const App = () => {
  // useEffect(() => {
  //   persistStore(store).purge();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
