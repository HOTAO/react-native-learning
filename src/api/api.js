import baseApi from './baseApi'

export default api = {
  fetchData(category) {
    const url = baseApi.category + category
    return fetch(url).then((response) => response.json())
  },
  fetchDataMore(category) {
    const url = baseApi.category + category;
    return fetch(url).then((response) => response.json())
  }
}