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

export const GreatImages: React.FC = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios.get(URL).then(res => {
      setInfo(res.data);
    });
  }, []);

  console.log('render GreatImages');

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={item => item.id}
        data={info}
        ListEmptyComponent={
          <View style={styles.listEmptyComponentContainer}>
            <ActivityIndicator size="large" color="darkblue" />
            <Text style={styles.listEmptyComponentText}>
              Server isn't responding, sorry :(
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <Image
            style={styles.images}
            source={{uri: item.download_url}}
            resizeMode="cover"
          />
        )}
      />

      {/* RENDER GreatImages WITHOUT FlatList */}
      {/* <ScrollView>
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
        </View>
      </ScrollView> */}
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
  listEmptyComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  listEmptyComponentText: {
    fontSize: 22,
  },
});
