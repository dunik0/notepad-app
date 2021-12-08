import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function MyButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>Save</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});
