import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MyButton from './MyButton';
import * as SecureStore from 'expo-secure-store';

export default function AddCategory() {
  const [newCategory, setNewCategory] = useState('');
  const newCategoryRef = useRef();

  const addNewCategory = async () => {
    if (!newCategory) return null;
    const categories = JSON.parse(await SecureStore.getItemAsync('categories'));
    const newCategories = [...categories, newCategory];
    newCategoryRef.current.clear();
    await SecureStore.setItemAsync('categories', JSON.stringify(newCategories));
  };

  return (
    <View style={styles.container}>
      <TextInput
        underlineColorAndroid="#000000"
        placeholder="Category name"
        onChangeText={setNewCategory}
        style={styles.input}
        ref={newCategoryRef}
      />
      <MyButton onPress={addNewCategory} content={'Add category'} />
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
