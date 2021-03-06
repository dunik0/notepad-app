import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import MyButton from './MyButton';
import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';

export default function AddNote({ navigation }) {
  const [title, onTitleChange] = useState();
  const [note, onNoteChange] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const titleRef = useRef();
  const noteRef = useRef();
  const isFocused = useIsFocused();

  useEffect(async () => {
    const newCategories = JSON.parse(
      await SecureStore.getItemAsync('categories')
    );
    if (newCategories) setCategories(newCategories);
  }, [isFocused]);

  const saveNote = async () => {
    if (title && note) {
      const color =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
      const key = uuid.v4();
      const item = { title, note, color, category, key, date: new Date() };
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

  const categoriesPicker = categories.map((item) => (
    <Picker.Item label={item} value={item} key={uuid.v4()} />
  ));

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
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={setCategory}
      >
        {categoriesPicker}
      </Picker>
      <MyButton onPress={saveNote} content={'Save'} />
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
  picker: {
    height: 40,
    width: '80%',
    backgroundColor: 'gray',
  },
});
