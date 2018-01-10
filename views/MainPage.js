import React, { Component } from 'react'
import {StyleSheet, Platform, View, Text, Image} from 'react-native';
import MoreFragment from './MoreTab/index';
import HomeFragment from './HomeTab/Index';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import theme from '../utils/theme'
import px2dp from '../utils/px2dp';

class MainPage extends Component{

  render(){
      return(
        <View style={styles.baseContent}>
          <BottomTabBar
              navigator={this.props.navigator}
              mainThemeColor={this.props.mainThemeColor}
              rowItemBackgroundColor={this.props.rowItemBackgroundColor}
              tabIconColor={this.props.tabIconColor}
          />
        </View>
      );
  }
}


class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'home'
    };
  }
  _renderItem(Component, tab, tabName, normalIcon, selectedIcon) {
    const {navigator, tabIconColor} = this.props;
    return(
        <TabNavigator.Item
            selected={this.state.selectedTab === tab}
            title={tabName}
            selectedTitleStyle={{color: tabIconColor}}
            renderIcon={() => <Image style={styles.tabBarItemIcon} source={normalIcon} />}
            renderSelectedIcon={() => <Image style={[styles.tabBarItemIcon, {tintColor: tabIconColor}]} source={selectedIcon} />}
            onPress={() => this.setState({ selectedTab: tab })}>
            {<Component navigator={navigator}/>}
        </TabNavigator.Item>
    );
  }

  componentWillMount(){
    const tabIconColor = this.props.tabIconColor;
    if(Platform.OS === 'ios') {
        Icon.getImageSource('ios-home-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({homeNormal: source}));
        Icon.getImageSource('ios-home-outline', 100, tabIconColor).then((source) => this.setState({homeSelected: source}));
        Icon.getImageSource('ios-compass-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({compassNormal: source}));
        Icon.getImageSource('ios-compass-outline', 100, tabIconColor).then((source) => this.setState({compassSelected: source}));
        Icon.getImageSource('ios-list-box-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({moreNormal: source}));
        Icon.getImageSource('ios-list-box-outline', 100, tabIconColor).then((source) => this.setState({moreSelected: source}));
        Icon.getImageSource('ios-cube-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({collectionNormal: source}));
        Icon.getImageSource('ios-cube-outline', 100, tabIconColor).then((source) => this.setState({collectionSelected: source}));
    }else if(Platform.OS === 'android'){
        Icon.getImageSource('md-home', 100, theme.tabButton.normalColor).then((source) => this.setState({homeNormal: source}));
        Icon.getImageSource('md-home', 100, tabIconColor).then((source) => this.setState({homeSelected: source}));
        Icon.getImageSource('md-compass', 100, theme.tabButton.normalColor).then((source) => this.setState({compassNormal: source}));
        Icon.getImageSource('md-compass', 100, tabIconColor).then((source) => this.setState({compassSelected: source}));
        Icon.getImageSource('md-list-box', 100, theme.tabButton.normalColor).then((source) => this.setState({moreNormal: source}));
        Icon.getImageSource('md-list-box', 100, tabIconColor).then((source) => this.setState({moreSelected: source}));
        Icon.getImageSource('md-cube', 100, theme.tabButton.normalColor).then((source) => this.setState({collectionNormal: source}));
        Icon.getImageSource('md-cube', 100, tabIconColor).then((source) => this.setState({collectionSelected: source}));
    }
  }

  render(){
    return(
        <TabNavigator
            tabBarStyle={[styles.tabBarStyle, {backgroundColor: this.props.rowItemBackgroundColor}]}
            sceneStyle={{
                paddingTop: theme.toolbar.paddingTop, //immersive experience
                paddingBottom: styles.tabBarStyle.height}}>
            {this._renderItem(HomeFragment, 'home', '首页', this.state.homeNormal, this.state.homeSelected)}
            {/* {this._renderItem(DiscoveryFragment, 'discovery', '发现', this.state.compassNormal, this.state.compassSelected)}
            {this._renderItem(CollectionFragment, 'collection', '收藏', this.state.collectionNormal, this.state.collectionSelected)}
            {this._renderItem(MoreFragment, 'more', '更多', this.state.moreNormal, this.state.moreSelected)} */}
            {this._renderItem(MoreFragment, 'more', '更多', this.state.moreNormal, this.state.moreSelected)}
        </TabNavigator>
    );
  }
}
const styles = {
  tabBarItemIcon: {
      width: px2dp(20),
      height: px2dp(20)
  },
  tabBarStyle: {
      height: px2dp(45),
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' ? px2dp(6) : px2dp(3)
  },
  baseContent: {
    paddingTop: px2dp(20),
    height: '100%',
    flex: 1
  }
}

export default MainPage;