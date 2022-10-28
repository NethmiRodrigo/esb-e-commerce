const { default: axios } = require('axios');

const baseURL = 'http://localhost:5003/auth';

export const register = async (data) => {
  const result = await axios.post(`${baseURL}/register`, data);
  return result;
};
