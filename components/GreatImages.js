import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';

const URL = 'https://picsum.photos/v2/list?page=1&limit=20';

export const GreatImages = () => {
  const [info, setInfo] = useState(null);

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
            <FlatList
              numColumns={2}
              keyExtractor={item => item.id}
              data={info}
              renderItem={({item}) => (
                <Image
                  style={styles.images}
                  source={{uri: item.download_url}}
                  resizeMode="cover"
                />
              )}
            />
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

          {/* WORK WITHOUT FlatList */}
          {/* {info ? (
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
          )} */}
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
    width: 150,
    height: 150,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
