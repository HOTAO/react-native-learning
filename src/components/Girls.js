import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../../utils/px2dp';
import theme from '../../utils/theme';
import api from '../api/api'
import baseApi from '../api/baseApi'

export default class HomeFragment extends Component {
  render() {
    return (
      <View style={styles.home}>
        <FlatList
          onRefresh={this._refresh}
          refreshing={false}
          onEndReached={this._getMore}
          onEndReachedThreshold={0.1}
          numColumns={2}
          data={this.state.imgs}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem.bind(this)}/>
        <Modal visible={this.state.modalVisible}>
          <View style={styles.modalBackground}>
            <Image
              resizeMode='contain'
              style={styles.modalImg}
              style={{
              width: this.state.imageWidth,
              height: this.state.imageHeight
            }}
              source={{
              uri: this.state.imageUrl
            }}/>
          </View>
          <View style={styles.closeBtn}>
            <TouchableOpacity
              onPress={this
              ._triggerModal
              .bind(this)}
              activeOpacity={theme.touchableOpacityActiveOpacity}>
              <Icon name="ios-close-circle-outline" color="#fff" size={px2dp(30)}/>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
  state = {
    modalVisible: false,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    page: 1,
    imgs: []
  }
  componentDidMount() {
    this._fetchData()
  }
  _fetchData() {
    const that = this
    api
      .fetchData('福利/20/1')
      .then(function (data) {
        that.setState({imgs: data.results})
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  _fetchDataMore() {
    const that = this
    api
      .fetchDataMore('福利/20/' + that.state.page + 1)
      .then(function (data) {
        that.setState({
          imgs: that
            .state
            .imgs
            .concat(data.results),
          page: that.state.page + 1
        })
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  _renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => this._itemOnPress(item)}>
        <Image
          resizeMode='stretch'
          style={styles.itemImg}
          source={{
          uri: item.url
        }}/>
      </TouchableOpacity>
    )
  }
  _keyExtractor = (item, index) => item._id
  _refresh = () => console.log('asd')
  _getMore = () => {
    this._fetchDataMore()
  }
  _itemOnPress = (item) => {
    this.setState({modalVisible: true, imageUrl: item.url})
    this._fetchHDImage(item.url)
  }
  _triggerModal = () => this.setState({
    modalVisible: !this.state.modalVisible
  })
  _fetchHDImage(url) {
    var correctWidth = theme.screenWidth;
    var correctHeight = theme.screenWidth;
    Image.getSize(url, (width, height) => {
      const ratioWidth = theme.screenWidth / width;
      const ratioHeight = theme.screenHeight / height;
      if (ratioWidth > ratioHeight) {
        correctWidth = ratioHeight * width;
        correctHeight = theme.screenHeight;
      } else {
        correctWidth = theme.screenWidth;
        correctHeight = ratioWidth * height;
      }
      this.setState({imageUrl: url, imageWidth: correctWidth, imageHeight: correctHeight});
    }, (error) => {
      this.setState({imageUrl: url, imageWidth: correctWidth, imageHeight: correctHeight});
    })
  }
}
const styles = {
  aaa: {
    color: '#fff'
  },
  home: {
    flex: 1,
    width: theme.screenWidth,
    height: theme.screenWidth / 2,
    padding: px2dp(3)
  },
  itemImg: {
    width: theme.screenWidth / 2 - px2dp(9),
    height: theme.screenWidth / 2,
    margin: px2dp(3)
  },
  modalBackground: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    width: theme.screenWidth,
    height: px2dp(50),
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingTop: px2dp(20),
    paddingRight: px2dp(20),
    zIndex: 1,
    backgroundColor: 'transparent'
  },
  modalImg: {
    width: theme.screenWidth
  }
}
