import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
} from 'react-native';
import axios from 'axios';

import LinearGradient from 'react-native-linear-gradient';

const URL = `http://api.openweathermap.org/data/2.5/weather?q=Chisinau&units=metric&lang=en&appid=8602c35696cbe0cd4ded486c50c70007`;
const URL_ICO = 'http://openweathermap.org/img/wn/';

export const Loading = () => {
  const [weather, setWeather] = useState<any>(null);

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
    axios.get(URL).then(res => {
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
    });
  }, []);

  return (
    <LinearGradient colors={['#00B4DB', '#0083B0']} style={styles.container}>
      {weather !== null ? (
        <View>
          <Text>{}</Text>
          <Text style={styles.date}>{date}</Text>
          <Image
            style={{height: 80, width: 80}}
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
            Found location coordinates of {weather.sys.country} {weather.name}
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
      ) : null}
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
    fontSize: 20,
    color: 'rgba(255,255,255, 0.9)',
    fontWeight: '700',
  },
  textLocation: {
    fontSize: 14,
    paddingVertical: 7,
  },
});
