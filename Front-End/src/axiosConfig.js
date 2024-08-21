import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://statswish.onrender.com/api/v1/player',
});

export default instance;