import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import infoIcon from '../assets/info-icon.png';
import appLogo from '../assets/app-logo.png';

export default function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Image source={appLogo} style={styles.logo} />
      <DrawerItemList {...props} />

      <DrawerItem
        label="Info"
        icon={() => <Image style={styles.icon} source={infoIcon} />}
        onPress={() => alert('Info')}
        labelStyle={styles.label}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 60,
    height: 60,
  },
  label: {
    fontSize: 18,
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
});
