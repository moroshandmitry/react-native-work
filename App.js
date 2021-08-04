/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import {NotePad} from './components/NotePad';
import {Counter} from './components/Counter';
import {Todo} from './components/Todo/Todo';
import {GreatImages} from './components/GreatImages';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const defaultState = {
  text: 'Some text is awesome!',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SOME_TEXT':
      return {...state, text: state.text + action.payload};

    default:
      return state;
  }
};

const store = createStore(reducer);

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Note" component={NotePad} />
          <Tab.Screen name="Count" component={Counter} />
          <Tab.Screen name="Todo" component={Todo} />
          <Tab.Screen name="Images" component={GreatImages} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
