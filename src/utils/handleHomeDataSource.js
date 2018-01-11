/*
 * @Author: HT
 * @Date: 2018-01-11 10:22:29
 * @Last Modified by: HT
 * @Last Modified time: 2018-01-11 14:12:16
 */
'use strict';

export function getCategoryList(dataSource) {
  if (dataSource.category) {
    return dataSource.category;
  } else {
    return null
  }
}

export function getTargetList(dataSource, target) {
  if (dataSource.results) {
    switch (target) {
      case 'Android':
        return dataSource.results.Android;
      case 'iOS':
        return dataSource.results.iOS;
      case '前端':
        return dataSource.results.前端;
      case '休息视频':
        return dataSource.results.休息视频;
      case '拓展资源':
        return dataSource.results.拓展资源;
      case 'App':
        return dataSource.results.App;
      case '瞎推荐':
        return dataSource.results.瞎推荐;
      default:
        return null;
    }
  } else {
    return null
  }
}

export function getFuLiUrl(dataSource) {
  if (dataSource.results) {
    return dataSource.results.福利[0].url;
  } else {
    return 'null'
  }
}