import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {formatTime} from "../utils/timeUtils";

interface LapsTableProps {
  lapTimes: number[];
}

/**
 * Displays a list of lap times with a lap number and time column.
 * */
export default function LapsTable(props: LapsTableProps) {
  const {lapTimes} = props;
  if (lapTimes.length === 0) {
    return <ScrollView style={styles.container}/>
  }
  return (
    <ScrollView style={styles.container} testID={'lap-list'}>
      {lapTimes.map((lapTime, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.text}>{index + 1}</Text>
          <Text style={styles.text}>{formatTime(lapTime)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  text: {
    fontSize: 16,
  }
});