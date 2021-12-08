import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';
import NoteItem from './NoteItem';

export default function NoteList() {
  const [keys, setKeys] = useState([]);
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
          await SecureStore.setItemAsync('keys', JSON.stringify(newKeys));
          await SecureStore.deleteItemAsync(key);
        },
      },
    ]);
  };

  const getKeys = async () => {
    const currentKeys = JSON.parse(await SecureStore.getItemAsync('keys'));
    if (currentKeys) setKeys(currentKeys);
    else await SecureStore.setItemAsync('keys', JSON.stringify([]));
  };

  useEffect(() => {
    getKeys();
  }, [isFocuesd]);

  return (
    <View>
      <FlatList
        data={keys}
        renderItem={({ item }) => (
          <NoteItem key={item} id={item} deleteItem={deleteItem} />
        )}
        keyExtractor={(item) => item}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
