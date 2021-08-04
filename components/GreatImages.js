import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const URL = 'https://picsum.photos/v2/list?page=1&limit=20';

export const GreatImages = () => {
  const [info, setInfo] = useState(null);

  //   const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await axios.get(URL).then(res => {
      setInfo(res.data);
    });
  }, []);

  if (!info) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
          borderWidth: 1,
        }}>
        <ActivityIndicator />
      </View>
      <ScrollView>
        <View style={styles.imagesContainer}>
          {info.map(itemInfo => {
            const {id, download_url, author} = itemInfo;
            return (
              <View key={id}>
                <Image
                  style={styles.images}
                  //   onLoadEnd={setLoading(false)}
                  source={{uri: download_url}}
                  resizeMode="cover"
                  //   onLoadStart={setLoading(true)}
                />
                {/* <ActivityIndicator
                  style={styles.activityIndicator}
                  animating={loading}
                /> */}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
  },
  images: {
    width: 140,
    height: 140,
    marginHorizontal: 10,
    marginVertical: 25,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
