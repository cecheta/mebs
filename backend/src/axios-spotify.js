const querystring = require('querystring');
const axios = require('axios');

const request = {
  expires: null,
  token: null,

  async get(url, config = {}) {
    if (!this.token || Date.now() / 1000 > this.expires) {
      try {
        await this.auth();
      } catch (error) {
        throw new Error(error);
      }
    }
    try {
      const response = await axios.get(`https://api.spotify.com${url}`, {
        ...config,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  async auth() {
    const data = querystring.stringify({ grant_type: 'client_credentials' });
    const config = {
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    };

    try {
      const res = await axios.post('https://accounts.spotify.com/api/token', data, config);
      this.token = res.data.access_token;
      this.expires = Math.floor(Date.now() / 1000) + 3500;
    } catch (error) {
      throw new Error(error);
    }
  },
};

request.get = request.get.bind(request);
request.auth = request.auth.bind(request);

module.exports = request;
