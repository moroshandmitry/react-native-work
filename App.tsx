/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import {NotePad} from './components/NotePad';
import {Counter} from './components/Counter';
import {Todo} from './components/Todo/Todo';
import {GreatImages} from './components/GreatImages';
import {Weather} from './components/Weather/Weather';
import Icon from 'react-native-vector-icons/FontAwesome';

import {reducers} from './redux/reducers/reducers';
const store = createStore(reducers);

export const App: React.FC = () => {
  console.log('render App');
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Notepad"
            options={{
              title: 'Notepad',
              tabBarIcon: () => <Icon name="rocket" size={20} color="#900" />,
            }}
            component={NotePad}
          />
          <Tab.Screen name="Count" component={Counter} />
          <Tab.Screen name="Todo" component={Todo} />
          <Tab.Screen name="Img" component={GreatImages} />
          <Tab.Screen name="Weather" component={Weather} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
