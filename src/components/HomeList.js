/*
 * @Author: HT
 * @Date: 2018-01-11 10:58:14
 * @Last Modified by: HT
 * @Last Modified time: 2018-01-15 10:29:13
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, FlatList, TouchableHighlight} from 'react-native';
import px2dp from '../utils/px2dp';
import theme from '../utils/theme';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import settingState from '../utils/settingState'
// import WebViewPage from '../containers/WebViewPage';

class HomeList extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    headerTitle: PropTypes.string
  };
  constructor(props) {
    super(props)
    this.tabIcon = [
      'logo-android',
      'logo-apple',
      'logo-chrome',
      'ios-film',
      'ios-book',
      'ios-apps',
      'ios-radio'
    ];
    this.tabColor = [
      'rgb(141,192,89)',
      '#000',
      'rgb(51,154,237)',
      '#9370db',
      '#00ced1',
      'rgb(249,89,58)',
      '#ffa500'
    ];
  }
  render() {
    return (
      <View>
        <FlatList
          onRefresh={this._refresh}
          refreshing={false}
          data={this.props.dataSource}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this
          ._renderHeader
          .bind(this)}
          renderItem={this
          ._renderItem
          .bind(this)}/>
      </View>
    )
  }

  _keyExtractor = (item, index) => item._id
  _refresh = () => console.log('asd')
  _itemOnPress(rowData) {
    console.log(rowData)
    console.log(this.props.navigator)
    // this.props.navigator.push({
    //   component: WebViewPage,
    //   args: {
    //     rowData: rowData
    //   }
    // });
  }
  _renderItem(rowData, sectionID, rowID, highlightRow) {
    return (
      <View>
        <TouchableHighlight
          overflow="hidden"
          key={rowID}
          onPress={this
          ._itemOnPress
          .bind(this, rowData)}
          underlayColor={theme.touchableHighlightUnderlayColor}>
          {this._renderRowContent(rowData.item)}
        </TouchableHighlight>
      </View>
    )
  }
  _renderRowContent(rowData) {
    return (
      <View style={[styles.rowItem, {backgroundColor: settingState.colorScheme.rowItemBackgroundColor}]}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <Icon name="ios-create-outline" color={settingState.colorScheme.subTitleColor}/>
          <Text style={{fontSize: px2dp(10),color: settingState.colorScheme.subTitleColor}}>
            {rowData.who? rowData.who : 'null'}
          </Text>
        </View>
        <Text style={[styles.rowContent, {color: settingState.colorScheme.titleColor}]} numberOfLines={2}>{rowData.desc}</Text>
      </View>
    );
  }
  _renderHeader() {
    const {headerTitle} = this.props;
    return (
      <View
        style={[
        styles.header, {
          backgroundColor: settingState.colorScheme.rowItemBackgroundColor,
          borderTopColor: settingState.colorScheme.segmentColor
        }
      ]}>
        <Avatar
          icon={this.tabIcon[this._judgeIconAttribute(headerTitle)]}
          width={px2dp(20)}
          backgroundColor={this.tabColor[this._judgeIconAttribute(headerTitle)]}/>
        <Text style={styles.headerLabel}>{this.props.headerTitle}</Text>
      </View>
    );
  }
  _judgeIconAttribute(hearderLabel) {
    switch (hearderLabel) {
      case 'Android':
        return 0;
      case 'iOS':
        return 1;
      case '前端':
        return 2;
      case '休息视频':
        return 3;
      case '拓展资源':
        return 4;
      case 'App':
        return 5;
      case '瞎推荐':
        return 6;
    }
  }
}
const styles = {
  container: {},
  header: {
    flexDirection: 'row',
    paddingTop: px2dp(12),
    paddingBottom: px2dp(6),
    paddingLeft: px2dp(15),
    alignItems: 'center',
    borderTopWidth: theme.segment.width
  },
  headerLabel: {
    color: 'steelblue',
    fontSize: px2dp(17),
    marginLeft: px2dp(7)
  },
  rowItem: {
    paddingTop: px2dp(10),
    paddingBottom: px2dp(10),
    paddingLeft: px2dp(15),
    paddingRight: px2dp(15),
    justifyContent: 'center'
  },
  rowContent: {
    fontSize: px2dp(14),
    paddingTop: px2dp(10)
  }
}
export default HomeList