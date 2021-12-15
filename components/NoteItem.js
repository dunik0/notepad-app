import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';

export default function NoteItem({ deleteItem, navigation, data }) {
  const isFocused = useIsFocused();

  const deleteSelf = async () => {
    deleteItem(data.key);
  };

  const editItem = () => {
    navigation.navigate('EditNote', { data });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={editItem}
        onLongPress={deleteSelf}
        style={[styles.button, { backgroundColor: data?.color }]}
      >
        <Text style={[styles.category, { color: data?.color }]}>
          {data?.category}
        </Text>
        <Text style={styles.date}>
          {data.loaded ? new Date(data?.date).toLocaleDateString() : null}
        </Text>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.note}>{data?.note}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    aspectRatio: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 0,
  },
  date: {
    marginLeft: 'auto',
    fontSize: 20,
  },
  title: {
    fontSize: 25,
  },
  note: {
    fontSize: 20,
  },
  category: {
    fontSize: 20,
    backgroundColor: 'black',
    marginRight: 'auto',
    padding: 5,
    borderRadius: 10,
  },
});
