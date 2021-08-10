import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';

export const GreatImages: React.FC = () => {
  const [infoData, setInfoData] = useState<any[]>([]);
  const [loadingLoader, setLoadingLoader] = useState<boolean>(false);
  const [pageCurrent, setPageCurrent] = useState<number>(49);

  useEffect(() => {
    console.log('useEffect pageCurrent', pageCurrent);
    setLoadingLoader(true);
    getData();
  }, [pageCurrent]);

  const getData = async () => {
    const limitImages = 20;
    console.log('getData', limitImages, pageCurrent);
    const URL = `https://picsum.photos/v2/list?page=${pageCurrent}&limit=${limitImages}`;

    const response = await axios.get(URL).then(({data}) => {
      if (data.length < limitImages) {
        return null;
      }
      setInfoData([...infoData, ...data]);
      // setInfoData(infoData.concat(data));
      setLoadingLoader(false);
    });
  };

  const handleLoadMoreImages = () => {
    console.log('handleLoadMoreImages');
    setPageCurrent(prev => prev + 1);
  };

  const renderFooterComponent = () =>
    !loadingLoader ? (
      <View>
        <ActivityIndicator size="large" color="darkblue" />
      </View>
    ) : null;

  const renderEmptyComponent = () => (
    <View style={styles.listEmptyComponentContainer}>
      <ActivityIndicator size="large" color="darkblue" />
      <Text style={styles.listEmptyComponentText}>
        Server isn't responding, sorry :(
      </Text>
    </View>
  );

  console.log('render Component');

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={infoData}
        keyExtractor={({id}) => id}
        onEndReached={handleLoadMoreImages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooterComponent}
        ListEmptyComponent={renderEmptyComponent}
        renderItem={({item: {download_url}}) => (
          <Image
            style={styles.images}
            source={{uri: download_url}}
            resizeMode="cover"
          />
        )}
      />
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
