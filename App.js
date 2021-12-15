import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './components/DrawerContent';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import AddCategory from './components/AddCategory';
import EditNote from './components/EditNote';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="NoteList" component={NoteList} />
        <Drawer.Screen name="AddNote" component={AddNote} />
        <Drawer.Screen name="AddCategory" component={AddCategory} />
        <Drawer.Screen name="EditNote" component={EditNote} />
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
