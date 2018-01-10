import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

export default class Index extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={styles.baseMt}>
        <TouchableHighlight accessible={true} accessibilityLabel={'Tap me!'} onPress={this._onPress} onLongPress={this._onLongPress}>
          <Image source={pic} style={{width: '100%',height: 110}}/>
        </TouchableHighlight>
      </View>
    );
  }
  _onPress() {
    console.log('点击事件')
  }
  _onLongPress() {
    console.log('长按事件')
  }
}
const styles = StyleSheet.create({
  baseMt: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
