import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function MyButton({ onPress, content }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{content}</Text>
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
