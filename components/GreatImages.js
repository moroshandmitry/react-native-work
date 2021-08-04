import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';

const URL = 'https://picsum.photos/v2/list?page=1&limit=20';

export const GreatImages = () => {
  const [info, setInfo] = useState(null);

  // const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await axios.get(URL).then(res => {
      setInfo(res.data);
    });
  }, [info]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imagesContainer}>
          {info ? (
            info.map(itemInfo => {
              const {id, download_url, author} = itemInfo;
              return (
                <View key={id}>
                  <Image
                    style={styles.images}
                    // onLoadEnd={setLoading(false)}
                    source={{uri: download_url}}
                    resizeMode="cover"
                  />
                </View>
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
              <ActivityIndicator size="large" color="darkblue" />
              <Text
                style={{
                  fontSize: 22,
                }}>
                Server isn't responding, sorry :(
              </Text>
            </View>
          )}
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
    width: 130,
    height: 130,
    marginHorizontal: 15,
    marginVertical: 4,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
