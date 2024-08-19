import axios from "axios";
import {ref} from "vue";

const accessToken = ref('')

const http = axios.create({
  baseURL: 'http://localhost:3001/api/',
  timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

/** @returns {String} api version */
export const getVersion = async () => {
  const response = await http.get('version')
  return response?.data?.version
}

/** @returns {String} accessToken if successful */
export const getToken = async () => {
  if(accessToken.value) {
    return accessToken.value
  }
  try {
    const response = await http.get('v1/getAccessToken')
    accessToken.value = response?.data?.access_token
    return response?.data
  } catch (e) {
    alert('Ups! Can\'t fetch the access token: ', e)
    return undefined
  }
}

/** @returns {Array} all matches if successful */
export const getAllMatches = async () => {
  try {
    const response = await http.get('v1/getAllMatches', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    })
    return response?.data?.matches
  } catch (e) {
    alert('Ups! Can\'t fetch the matches: ', e)
    return []
  }
}