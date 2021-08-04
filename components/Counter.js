import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncreaseCount = () => {
    setCount(prev => prev + 1);
  };

  const handleDecreaseCount = () => {
    setCount(prev => {
      if (prev <= 0) return 0;
      else return prev - 1;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.checkCounterText}>
        <Text style={{fontSize: 25, color: '#fff'}}>Check counter!</Text>
        <Text style={{fontSize: 20, color: '#fff'}}>
          {count > 0
            ? `You have a ${count} product${count > 1 ? 's' : ''} selected!`
            : 'Please click on counter!'}
        </Text>
      </View>

      <View style={styles.counterContainer}>
        <TouchableOpacity
          onPress={handleIncreaseCount}
          style={[
            styles.button,
            {
              backgroundColor: 'rgba(20,230,120,0.7)',
              borderColor: '#8AFF8A',
            },
          ]}>
          <Text style={{color: '#ffd', fontSize: 16, fontWeight: '700'}}>
            Increase count
          </Text>
        </TouchableOpacity>

        <Text style={{color: '#fff', fontSize: 33}}>{count}</Text>

        <TouchableOpacity
          onPress={handleDecreaseCount}
          style={[
            styles.button,
            count === 0
              ? {
                  backgroundColor: 'rgba(255,55,20,0.5)',
                  borderColor: '#ff998f',
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
            {count === 0 ? 'Count is disabled' : 'Decrease count'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(22,13,57,0.7)',
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
    borderWidth: 5,
    alignItems: 'center',
    height: 70,
    width: 100,
    borderRadius: 7,
    justifyContent: 'center',
  },
});
