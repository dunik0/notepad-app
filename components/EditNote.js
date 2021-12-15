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

export default function EditNote({ route: { params }, navigation }) {
  const [title, onTitleChange] = useState();
  const [note, onNoteChange] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const titleRef = useRef();
  const noteRef = useRef();
  const isFocused = useIsFocused();
  //   console.log(params);
  useEffect(async () => {
    const newCategories = JSON.parse(
      await SecureStore.getItemAsync('categories')
    );
    if (newCategories) setCategories(newCategories);

    onTitleChange(params.data.title);
    onNoteChange(params.data.note);
    setCategory(params.data.category);
  }, [isFocused, params.data]);

  const saveNote = async () => {
    if (title && note) {
      console.log({ data: params.data });
      const { key, color, date } = params.data;
      const item = {
        title,
        note,
        color,
        category,
        date,
        key,
        editDate: new Date(),
      };
      await SecureStore.setItemAsync(key, JSON.stringify(item));
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
        value={title}
        onChangeText={onTitleChange}
        style={styles.input}
        ref={titleRef}
      />
      <TextInput
        underlineColorAndroid="#000000"
        placeholder="Note"
        value={note}
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
