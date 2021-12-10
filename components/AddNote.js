import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import MyButton from './MyButton';
import * as SecureStore from 'expo-secure-store';
// import * as uuid from 'uuid';
import uuid from 'react-native-uuid';
import { NavigationContainer } from '@react-navigation/native';

export default function AddNote({ navigation }) {
  const [title, onTitleChange] = useState();
  const [note, onNoteChange] = useState();
  const titleRef = useRef();
  const noteRef = useRef();

  const saveNote = async () => {
    if (title && note) {
      const color =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
      const item = { title, note, color, date: new Date() };
      const key = uuid.v4();
      const keys = JSON.parse(await SecureStore.getItemAsync('keys'));
      await SecureStore.setItemAsync(key, JSON.stringify(item));
      await SecureStore.setItemAsync('keys', JSON.stringify([...keys, key]));
      titleRef.current.clear();
      noteRef.current.clear();
      navigation.navigate('NoteList');
    } else {
      alert('Input field is empty');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        underlineColorAndroid="#000000"
        placeholder="Title"
        onChangeText={onTitleChange}
        style={styles.input}
        ref={titleRef}
      />
      <TextInput
        underlineColorAndroid="#000000"
        placeholder="Note"
        onChangeText={onNoteChange}
        style={styles.input}
        ref={noteRef}
      />
      <MyButton onPress={saveNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 60,
    fontSize: 20,
    padding: 5,
  },
  container: {
    alignItems: 'center',
  },
});
