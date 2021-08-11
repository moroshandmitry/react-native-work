import React, {Component} from 'react';
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

interface Data {
  download_url: string;
  id: number;
}
interface GreatImagesState {
  infoData: Data[];
  loadingLoader: boolean;
  noMoreData: boolean;
  pageCurrent: number;
}

export class GreatImages extends Component<{}, GreatImagesState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      infoData: [],
      loadingLoader: false,
      pageCurrent: 1,
      noMoreData: false,
    };
  }

  componentDidMount() {
    console.log('this.pageCurrent', this.state.pageCurrent);
    this.fetchData();
  }

  fetchData = () => {
    if (this.state.noMoreData) {
      return;
    }
    this.setState(
      prevState => ({
        loadingLoader: !prevState.loadingLoader,
      }),
      () => {
        console.log('loadingLoader: true');
      },
    );
    const limitImages = 20;
    const URL = `https://picsum.photos/v2/list?page=${this.state.pageCurrent}&limit=${limitImages}`;

    axios.get(URL).then(({data}) => {
      this.setState(prevState => ({
        infoData: [...prevState.infoData, ...data],
        loadingLoader: prevState.loadingLoader,
        noMoreData: data.length < limitImages,
      }));
    });
  };

  handleLoadMoreImages = () => {
    console.log('handleLoadMoreImages');

    this.setState(
      prevState => ({
        pageCurrent: prevState.pageCurrent + 1,
      }),
      this.fetchData,
    );
  };

  renderFooterComponent = () =>
    this.state.loadingLoader ? (
      <View>
        <ActivityIndicator size="large" color="darkblue" />
      </View>
    ) : null;

  renderEmptyComponent = () => (
    <View style={styles.listEmptyComponentContainer}>
      <Text style={styles.listEmptyComponentText}>
        Server isn't responding, sorry :(
      </Text>
    </View>
  );

  renderItem = ({item: {download_url}}: {item: Data}) => (
    <Image
      style={styles.images}
      source={{uri: download_url}}
      resizeMode="cover"
    />
  );

  render() {
    // const {infoData} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={2}
          data={this.state.infoData}
          keyExtractor={({id}) => id.toString()}
          onEndReached={this.handleLoadMoreImages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooterComponent}
          ListEmptyComponent={this.renderEmptyComponent}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
    width: 'auto',
  },
  imagesContainer: {
    // flexDirection: 'row',
    flexWrap: 'wrap',
  },
  images: {
    height: 160,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
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
