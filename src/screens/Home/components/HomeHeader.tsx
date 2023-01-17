import {normalize} from '../../../common/helpers/responsive';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {COLORS, FONT_SIZE, letterSpacing} from '../../../theme';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View>
          <Text style={styles.todoApp}>InfoCasas APPs</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: normalize(3),
    borderBottomColor: COLORS.gray,
    height: normalize(50),
    justifyContent: 'flex-end',
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(10),
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoApp: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '600',
    letterSpacing: letterSpacing,
    // width: normalize(120),
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    paddingHorizontal: 10,
  },
});
