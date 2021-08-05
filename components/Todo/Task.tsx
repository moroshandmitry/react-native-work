import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export type Props = {
  text: string;
};

export const Task: React.FC<Props> = ({text}) => {
  const [square, setSquare] = useState(true);

  const handleToggleSquare = () => {
    setSquare(prev => !prev);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={handleToggleSquare}>
          <View style={square ? styles.square : styles.squareSuccess}>
            {square}
          </View>
        </TouchableOpacity>
        <Text style={square ? styles.itemText : styles.itemTextComplete}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#dadada',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 7,
    marginRight: 15,
  },
  squareSuccess: {
    width: 24,
    height: 24,
    backgroundColor: '#009900',
    opacity: 0.4,
    borderRadius: 7,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    fontSize: 15,
  },
  itemTextComplete: {
    maxWidth: '80%',
    fontSize: 15,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
