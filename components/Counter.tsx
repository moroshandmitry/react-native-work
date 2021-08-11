import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  // useEffect(() => {
  //   console.log('componentDidMount');

  //   return () => {
  //     console.log('componentWillUnmount');
  //   }
  // }, [])

  const handleIncreaseCount = () => {
    setCount(prev => {
      if (prev < 10) return prev + 1;
      else return prev;
    });
  };

  const handleDecreaseCount = () => {
    setCount(prev => {
      if (prev <= 0) return 0;
      else return prev - 1;
    });
  };

  console.log('render Counter', count);

  return (
    <LinearGradient colors={['#4e54c8', '#8f94fb']} style={styles.container}>
      <View style={styles.checkCounterText}>
        <Text style={{fontSize: 25, color: 'rgba(255, 255, 255, 0.9)'}}>
          Check counter!
        </Text>
        <Text style={{fontSize: 20, color: 'rgba(255, 255, 255, 0.9)'}}>
          {count > 0 && count < 10
            ? `You have a ${count} product${count > 1 ? 's' : ''} selected!`
            : count === 10
            ? `${count} is max count of products!`
            : 'Please click on counter!'}
        </Text>
      </View>

      <View style={styles.counterContainer}>
        <TouchableOpacity
          onPress={handleIncreaseCount}
          style={[
            styles.button,
            count === 10
              ? {
                  backgroundColor: 'rgba(108, 122, 137, 1)',
                  borderColor: '#cdcdcd',
                }
              : {
                  backgroundColor: 'rgba(77, 175, 124, 1)',
                  borderColor: 'rgba(102, 204, 153, 1)',
                },
          ]}
          disabled={count === 10}>
          <Text style={{color: '#ffd', fontSize: 16, fontWeight: '700'}}>
            {count === 10 ? 'Disabled' : 'Increase'}
          </Text>
        </TouchableOpacity>

        <Text style={{color: 'rgba(46, 49, 49, 1)', fontSize: 33}}>
          {count}
        </Text>

        <TouchableOpacity
          onPress={handleDecreaseCount}
          style={[
            styles.button,
            count === 0
              ? {
                  backgroundColor: 'rgba(108, 122, 137, 1)',
                  borderColor: '#cdcdcd',
                }
              : {
                  backgroundColor: 'rgba(255,55,20,0.9)',
                  borderColor: '#ff998f',
                },
          ]}
          disabled={count === 0}>
          <Text
            style={
              count === 0
                ? {color: '#000', fontSize: 16, fontWeight: '700'}
                : {color: '#ffd', fontSize: 16, fontWeight: '700'}
            }>
            {count === 0 ? 'Disabled' : 'Decrease'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(210, 215, 211, 1)',
    flex: 1,
    paddingTop: 7,
  },
  checkCounterText: {
    alignItems: 'center',
  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 7,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 7,
    justifyContent: 'center',
  },
});
