import React, {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotePad = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [value, setValue] = useState('');

  // REDUX
  const dispatch = useDispatch();
  const text = useSelector(state => state.text);
  // REDUX

  const addText = text => dispatch({type: 'SOME_TEXT', payload: text});

  const saveValue = () => {
    if (textInputValue) {
      AsyncStorage.setItem('valueFromInput', textInputValue);
      setTextInputValue();
      alert('Value will saved');
    } else {
      alert(
        `Please write a text in field input and press button => 'Save text'`,
      );
    }
  };

  const getValue = () => {
    AsyncStorage.getItem('valueFromInput').then(value => {
      setValue(value);
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.titleText}>AsyncStorage</Text>

        <TextInput
          style={styles.textInputStyle}
          placeholder="Write some text here..."
          value={textInputValue}
          onChangeText={text => setTextInputValue(text)}
          // underlineColorAndroid="transparent"
          // multiline={true}
          // numberOfLines={4}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={saveValue}>
          <Text style={styles.buttonTextStyle}>Save text</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={getValue}>
          <Text style={styles.buttonTextStyle}>Get text</Text>
        </TouchableOpacity>

        <Text style={value ? styles.textStyle : {display: 'none'}}>
          {value}
        </Text>

        {/* REDUX */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => addText(' This text is payload from Redux')}>
          <Text style={styles.buttonTextStyle}>Payload Redux</Text>
        </TouchableOpacity>

        <ScrollView>
          <Text style={styles.textStyle}>{text}</Text>
        </ScrollView>
        {/* REDUX */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(218, 223, 225, 1)',
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
  },
  textInputStyle: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: 'rgba(103, 128, 159, 1)',
    fontSize: 16,
  },
  buttonStyle: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'rgba(103, 128, 159, 1)',
    marginTop: 10,
    borderRadius: 20,
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonTextStyle: {
    padding: 5,
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
  textStyle: {
    padding: 5,
    fontSize: 16,
    color: 'rgba(46, 49, 49, 1)',
    textAlign: 'justify',
  },
});
