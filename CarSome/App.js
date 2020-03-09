/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';
import { getStatusBarMargin } from './UI';

const statusBarMargin = getStatusBarMargin();

export default class App extends Component {
  state = {
    loading: true,
    albums: [],
  };

  getAlbumsList = async page => {
    try {
      let response = await fetch(
        'https://jsonplaceholder.typicode.com/photos?albumId=' + page,
      );
      let responseJson = await response.json();
      this.setState({ albums: responseJson, loading: false });
      console.log('albums is', this.state.albums);
    } catch (error) {
      console.error(error);
    }
  };
  componentDidMount() {
    this.getAlbumsList(1);
  }
  _onOnePressButton = () => {
    this.getAlbumsList(1);
  };
  _onTwoPressButton = () => {
    this.getAlbumsList(2);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>CarSome</Text>
        </View>
        <View style={styles.pagesView}>
          <TouchableHighlight onPress={this._onOnePressButton} style={styles.touchableButton}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onTwoPressButton} style={styles.touchableButton}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableHighlight>
        </View>
        <SafeAreaView style={styles.safeContainer}>
          <FlatGrid
            itemDimension={150}
            items={this.state.albums}
            style={styles.gridView}
            renderItem={({ item }) => (
              <ImageBackground
                source={{ uri: item.thumbnailUrl }}
                style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.title}</Text>
              </ImageBackground>
            )}
          />
        </SafeAreaView>
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pagesView: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    width: 20,
    backgroundColor: 'black',
    height: '60%',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,

  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#ffde00',
    height: 70 + statusBarMargin,
    justifyContent: 'center',
    paddingTop: 10 + statusBarMargin,
    width: '100%',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  headerTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    paddingTop: 5,
  },

  itemName: {
    bottom: 0,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
