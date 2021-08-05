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
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {TypesDefaultStateOfRedux} from '../redux/globalState/globalState';

export const NotePad: React.FC = () => {
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [value, setValue] = useState<string>('');

  // REDUX
  const dispatch = useDispatch();
  const text = useSelector((state: TypesDefaultStateOfRedux) => state.text);
  // REDUX

  const addText = (text: string) =>
    dispatch({type: 'SOME_TEXT', payload: text});

  const saveValue = () => {
    if (textInputValue) {
      AsyncStorage.setItem('valueFromInput', textInputValue);
      setTextInputValue('');
      Alert.alert('Value will saved');
    } else {
      Alert.alert(`Please write a text and press button => 'Save text'`);
    }
  };

  const getValue = () => {
    AsyncStorage.getItem('valueFromInput').then((value: any) => {
      return setValue(value);
    });
  };

  console.log('render NotePad textInputValue', textInputValue);

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
