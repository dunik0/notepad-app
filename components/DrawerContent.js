import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import infoIcon from '../assets/info-icon.png';
import appLogo from '../assets/app-logo.png';
import notesIcon from '../assets/notes-icon.png';
import plusIcon from '../assets/plus-icon.png';

export default function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Image source={appLogo} style={styles.logo} />
      {/* <DrawerItemList {...props} /> */}

      <DrawerItem
        label="Your notes"
        icon={() => <Image source={notesIcon} style={styles.icon} />}
        onPress={() => props.navigation.navigate('NoteList')}
        labelStyle={styles.label}
      />

      <DrawerItem
        label="New note"
        icon={() => <Image source={plusIcon} style={styles.icon} />}
        onPress={() => props.navigation.navigate('AddNote')}
        labelStyle={styles.label}
      />

      <DrawerItem
        label="New category"
        icon={() => <Image source={plusIcon} style={styles.icon} />}
        onPress={() => props.navigation.navigate('AddCategory')}
        labelStyle={styles.label}
      />

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
