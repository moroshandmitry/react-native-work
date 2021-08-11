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
import Icon from 'react-native-vector-icons/FontAwesome';

import {NotePad} from './components/NotePad';
import {Counter} from './components/Counter';
import {Todo} from './components/Todo/Todo';
import {GreatImages} from './components/GreatImages';
import {Weather} from './components/Weather/Weather';

import {reducers} from './redux/reducers/reducers';
const store = createStore(reducers);

export const App: React.FC = () => {
  console.log('render App');
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 12,
              color: 'rgba(52, 152, 219, 1)',
              fontWeight: '700',
              textTransform: 'capitalize',
              textAlign: 'center',
              margin: 0,
              paddingVertical: 3,
              paddingHorizontal: 0,
            },
          }}>
          <Tab.Screen
            name="Notepad"
            options={{
              title: 'Notes',
              tabBarIcon: () => (
                <Icon
                  name="save"
                  size={22}
                  color="rgba(68, 108, 179, 1)"
                  style={{textAlign: 'center'}}
                />
              ),
            }}>
            {(props: any) => <NotePad {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Counter"
            options={{
              title: 'Count',
              tabBarIcon: () => (
                <Icon
                  name="sort"
                  size={22}
                  color="rgba(52, 152, 219, 1)"
                  style={{textAlign: 'center'}}
                />
              ),
            }}>
            {(props: any) => <Counter {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Todo"
            options={{
              title: 'Todo',
              tabBarIcon: () => (
                <Icon
                  name="book"
                  size={22}
                  color="rgba(27, 163, 156, 1)"
                  style={{textAlign: 'center'}}
                />
              ),
            }}>
            {(props: any) => <Todo {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="image"
            options={{
              title: 'image',
              tabBarIcon: () => (
                <Icon
                  name="image"
                  size={22}
                  color="rgba(123, 239, 178, 1)"
                  style={{textAlign: 'center'}}
                />
              ),
            }}>
            {(props: any) => <GreatImages {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Weather"
            options={{
              title: 'Weather',
              tabBarIcon: () => (
                <Icon
                  name="cloud"
                  size={22}
                  color="rgba(103, 128, 159, 1)"
                  style={{textAlign: 'center'}}
                />
              ),
            }}>
            {(props: any) => <Weather {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
