import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios, {AxiosError} from 'axios';

import {API_KEY} from '@env';

import LinearGradient from 'react-native-linear-gradient';
import {resolve} from 'dns/promises';

const URL_ICO = 'http://openweathermap.org/img/wn/';

export const Loading: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState<string>('Chisinau');

  const [date, setNewDate] = useState<string>('');

  const getDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const getHours = hours < 10 ? `0${hours}` : `${hours}`;
    const getMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const getSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    setNewDate(`${getHours}:${getMinutes}:${getSeconds}`);
  };

  useEffect(() => {
    const interval = setInterval(getDate, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axiosGetData();
    setCity('');
  }, []);

  const axiosGetData = async () => {
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${API_KEY}`;
    // callback hell
    await axios
      .get(URL)
      .then(res => {
        // setWeather(res.data);

        // const data: {
        //   name?: string;
        //   visibility: boolean;
        // } = res.data;

        const {
          name,
          visibility,
          timezone,
          weather: [{main, description, icon}],
          main: {temp, feels_like, humidity},
          sys: {country},
          coord: {lon, lat},
          wind: {speed},
        } = res.data;

        setWeather({
          name,
          visibility,
          timezone,
          weather: [{main, description, icon}],
          main: {temp, feels_like, humidity},
          sys: {country},
          coord: {lon, lat},
          wind: {speed},
        });
      })
      .catch(error => {
        // if (error.response.data.cod) {
        //   console.log(error.response);
        //   console.warn(Object.keys(error.response.data));
        // }

        const {cod, message} = error.response.data;

        // console.log(Object.keys(error.response.data.cod));

        setWeather({
          cod,
          message,
        });
      });
  };

  const handleSearchWeather = () => {
    axiosGetData();
    setCity('');
  };

  return (
    <LinearGradient colors={['#00B4DB', '#0083B0']} style={styles.container}>
      {weather !== null ? (
        <View>
          {weather.message === 'city not found' ? (
            <View>
              <Text
                style={{color: '#fff', textAlign: 'center', fontWeight: '700'}}>
                {weather.message.toUpperCase()}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.date}>{date}</Text>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  alignSelf: 'center',
                }}
                source={{uri: URL_ICO + `${weather.weather[0].icon}.png`}}
                resizeMode="cover"
              />
              <Text style={styles.textWeather}>
                {weather.name} {weather.main.temp}°C{'\n'}
                Feels like {weather.main.feels_like}°C{'\n'}
                {weather.weather[0].main}
                {'\n'}
                {weather.weather[0].description}
              </Text>
              <Text style={styles.textLocation}>
                Found location coordinates of {weather.sys.country}{' '}
                {weather.name}
              </Text>
              <Text>Longitude {weather.coord.lon}</Text>
              <Text>Latitude {weather.coord.lat}</Text>
              <Text>Humidity {weather.main.humidity}%</Text>
              <Text>Visibility {weather.visibility / 1000} km</Text>
              <Text>Wind speed {weather.wind.speed} m/s</Text>
              <Text>
                Timezone in {weather.name} (GMT+{weather.timezone / 60 / 60})
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#fff',
                fontWeight: '700',
                width: '70%',
                color: '#fff',
              }}
              keyboardType="default"
              onChangeText={setCity}
              placeholder="Write a city"
              placeholderTextColor="#fff"
              value={city}
              enablesReturnKeyAutomatically={true}
            />
            <TouchableOpacity
              style={
                city === '' ? styles.buttonSearchDisabled : styles.buttonSearch
              }
              onPress={handleSearchWeather}
              disabled={city === ''}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="cyan" />
          <Text style={styles.textServerNotResponding}>
            Server isn't responding, sorry :(
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  date: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
  },
  textWeather: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(255,255,255, 0.9)',
    fontWeight: '700',
  },
  textLocation: {
    fontSize: 14,
    paddingVertical: 7,
  },
  textServerNotResponding: {
    alignItems: 'center',
    fontSize: 20,
    color: '#fff',
  },
  buttonSearch: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(150, 120, 150, 1)',
  },
  buttonSearchDisabled: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
});

// const fetchData = async () => {
//   const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${API_KEY}`;
//   // callback hell
//   await axios
//     .get(URL)
//     .then(res => {
//       // setWeather(res.data);

//       // const data: {
//       //   name?: string;
//       //   visibility: boolean;
//       // } = res.data;
//       const {
//         name,
//         visibility,
//         timezone,
//         weather: [{main, description, icon}],
//         main: {temp, feels_like, humidity},
//         sys: {country},
//         coord: {lon, lat},
//         wind: {speed},
//       } = res.data;

//       setWeather({
//         name,
//         visibility,
//         timezone,
//         weather: [{main, description, icon}],
//         main: {temp, feels_like, humidity},
//         sys: {country},
//         coord: {lon, lat},
//         wind: {speed},
//       });
//       console.log('Hello');
//     })
//     .catch((error: Error | AxiosError<{code: number}>) => {
//       if ('isAxiosError' in error) {
//         console.log(Object.keys(error.response.data.code));
//       }
//       // console.log(res.request);
//       // const {cod, message} = res.response.data;
//       // setWeather({
//       //   cod,
//       //   message,
//       // });
//     });
// };
