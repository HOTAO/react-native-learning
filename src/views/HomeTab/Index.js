import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, Image, ScrollView, Animated, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../../utils/px2dp';
import theme from '../../utils/theme';
import api from '../../api/api'
import {getCurrentDate} from '../../utils/getDate';
import NavigationBar from '../../components/NavigationBar';
import * as Info from '../../utils/handleHomeDataSource';
import settingState from '../../utils/settingState'
import HomeList from '../../components/HomeList'

export default class HomeFragment extends Component {
  render() {
    console.log(this.props.navigator)
    return (
      <View>
        <ScrollView
          onScroll={this._onScroll.bind(this)}
          refreshControl={
            <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this._onPress.bind(this, 0)}
                tintColor={'#fff'}
                colors={['#fff']}
                title="拼命加载中..."
            />}>
            <View>
              <View>
                <ImageView imgUrl={Info.getFuLiUrl(this.state.homeData)} labelTime={this.state.headerTime}></ImageView>
              </View>
              <View style={styles.scrollContents}>
                {this.state.displayOrder.map((item, i) => {
                  {item}
                  if (item !== '福利' && Info.getTargetList(this.state.homeData, item) != null)
                    return (
                      <HomeList
                        key={i}
                        navigator={this.props.navigator}
                        dataSource={Info.getTargetList(this.state.homeData, item)}
                        headerTitle={item}/>
                    );
                  }
                )}
              </View>
            </View>
        </ScrollView>
      </View>
    )
  }
  state = {
    displayOrder: settingState.displayOrder,
    homeData: {},
    category: [],
    loading: false,
    opacity: new Animated.Value(0),
    headerTime: getCurrentDate()
  }
  componentDidMount() {
    this._fetchData()
  }
  _onPress(id) {
    if (id === 0)
        this._fetchData();
    else if (id === 1)
        ;
  }
  _onScroll(event){
    var offsetY = event.nativeEvent.contentOffset.y;
    if(offsetY <= this.imageHeight - theme.toolbar.height){
        var opacity = offsetY / (this.imageHeight - theme.toolbar.height);
        this.setState({opacity: opacity});
    }else{
        this.setState({opacity: 1});
    }
}
  _fetchData() {
    this.setState({loading: true})
    const that = this
    api
      .HomePageData('2018/01/10')
      .then(function (data) {
        console.log(data)
        that.setState({homeData: data,loading: false})
      })
      .catch(function (e) {
        console.log(e);
      });
  }
}
class ImageView extends Component {
  static propTypes = {
    imgUrl: PropTypes.string,
    labelTime: PropTypes.string
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
          uri: this.props.imgUrl
        }}
          style={styles.img}/>
        <View style={styles.dateLabel}>
          <Text style={styles.label}>{this.props.labelTime}</Text>
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  toolbar: {
    position: 'absolute',
    width: theme.screenWidth,
    zIndex: 1
  },
  img: {
    width: theme.screenWidth,
    height: px2dp(400),
    resizeMode: 'cover'
  },
  dateLabel: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'relative',
    width: theme.screenWidth,
    height: px2dp(50),
    bottom: px2dp(50),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  label: {
    color: '#fff',
    fontSize: px2dp(20),
    marginRight: px2dp(20),
    fontWeight: 'bold'
  }
}
