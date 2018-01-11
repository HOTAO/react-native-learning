import colors from './colors';

export default initState = {
  themeColor: colors.dodgerBlue,
  isOpenThumbnail: true,
  isOpenNightMode: false,
  isAutoFetch: true,
  displayOrder: [
    'Android',
    'iOS',
    '前端',
    '拓展资源',
    '休息视频',
    'App',
    '瞎推荐'
  ],
  colorScheme: { //dayMode color scheme for the default color
    mainThemeColor: colors.dodgerBlue,
    pageBackgroundColor: '#f4f4f4',
    segmentColor: '#ccc',
    titleColor: '#000',
    subTitleColor: '#aaa',
    rowItemBackgroundColor: '#fff',
    arrowColor: '#ccc',
    tabIconColor: colors.dodgerBlue,
    thumbnailColor: '#f1f1f1',
    webViewToolbarColor: 'rgba(255,255,255,.9)'
  }
}