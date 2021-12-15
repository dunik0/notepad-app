import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';
import NoteItem from './NoteItem';

export default function NoteList({ navigation }) {
  const [keys, setKeys] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [notesData, setNotesData] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const isFocuesd = useIsFocused();

  const deleteItem = (key) => {
    Alert.alert('Delete item?', '', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          const newKeys = [...keys];
          newKeys.splice(keys.indexOf(key), 1);
          setKeys(newKeys);
          const newNotesData = notesData.filter((item) => item.key !== key);
          setNotesData(newNotesData);
          await SecureStore.setItemAsync('keys', JSON.stringify(newKeys));
          await SecureStore.deleteItemAsync(key);
        },
      },
    ]);
  };

  const getStorageItem = async (key) => {
    const item = JSON.parse(await SecureStore.getItemAsync(key));
    if (item) return item;
    else await SecureStore.setItemAsync(key, JSON.stringify([]));
  };

  useEffect(async () => {
    setKeys(await getStorageItem('keys'));
    getStorageItem('categories');
  }, [isFocuesd]);

  useEffect(async () => {
    const newNotesData = await Promise.all(
      keys.map(async (key) => JSON.parse(await SecureStore.getItemAsync(key)))
    );
    setNotesData(newNotesData);
  }, [keys, isFocuesd]);

  useEffect(() => {
    const newFilteredNotes = notesData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.note.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.category.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredNotes(newFilteredNotes);
  }, [searchInput]);

  return (
    <View>
      <TextInput
        placeholder="Search notes"
        value={searchInput}
        onChangeText={setSearchInput}
        style={styles.search}
        // ref={searchRef}
      />
      <FlatList
        data={searchInput ? filteredNotes : notesData}
        renderItem={({ item }) => (
          <NoteItem
            key={item.key}
            data={item}
            navigation={navigation}
            deleteItem={deleteItem}
          />
        )}
        keyExtractor={(item) => item.key}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: 'gray',
    height: 40,
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: 'black',
    fontSize: 18,
  },
});
