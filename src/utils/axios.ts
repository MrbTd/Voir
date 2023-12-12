import axios from 'axios';
import {baseUrl} from './urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncStorageType} from './data';
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  async function (config: any) {
    const token = await AsyncStorage.getItem(asyncStorageType.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
