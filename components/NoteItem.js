import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function NoteItem({ id, deleteItem }) {
  const [data, setData] = useState({ loaded: false });
  // const [randomColor, setRandomColor] = useState();

  const deleteSelf = async () => {
    deleteItem(id);
  };

  useEffect(async () => {
    setData({
      ...JSON.parse(await SecureStore.getItemAsync(id)),
      loaded: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={deleteSelf}
        style={[styles.button, { backgroundColor: data?.color }]}
      >
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
});
