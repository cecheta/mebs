const querystring = require('querystring');
const axios = require('axios');

let token = null;
let expires = Date.now() / 1000;

const instance = axios.create({
  baseURL: 'https://api.spotify.com',
});

instance.interceptors.request.use(async (config) => {
  if (!token || Date.now() / 1000 > expires) {
    try {
      await auth();
    } catch (error) {
      console.log(error);
    }
  }

  config.headers.common = {
    ...config.headers.common,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

const auth = async () => {
  const data = querystring.stringify({ grant_type: 'client_credentials' });
  const config = {
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET,
    },
  };

  const res = await axios.post('https://accounts.spotify.com/api/token', data, config);
  token = res.data.access_token;
  expires = Math.floor(Date.now() / 1000) + 3500;
};

module.exports = instance;
