import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FrontPage from './components/FrontPage';
import DrawerContent from './components/DrawerContent';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import notesIcon from './assets/notes-icon.png';
import plusIcon from './assets/plus-icon.png';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="NoteList"
          component={NoteList}
          options={{
            drawerIcon: () => <Image source={notesIcon} style={styles.icon} />,
            drawerLabel: 'Your notes',
            drawerLabelStyle: styles.drawer,
          }}
        />
        <Drawer.Screen
          name="AddNote"
          component={AddNote}
          options={{
            drawerIcon: () => <Image source={plusIcon} style={styles.icon} />,
            drawerLabel: 'New note',
            drawerLabelStyle: styles.drawer,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 60,
  },
  drawer: {
    fontSize: 18,
  },
});
