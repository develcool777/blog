const axios = require('axios');

class Api {
  constructor(url) {
    if (typeof url !== 'string') {
      throw new Error('Api constructor() url expected to be String');
    }
    Object.defineProperties(this, {
      url: { get: () => url },
      status: {
        get: () => (obj) => {
          console.log(`Status code: ${obj.status}`);
          console.log(`Status text: ${obj.statusText}`);
          console.log(`Request method: ${obj.request.method}`);
          console.log(`Path: ${obj.request.path}`);
          console.log(`Date: ${obj.headers.date}`);  
        }
      }
    })
    Object.freeze(this)
  }

  async makeGet(params='', isStatus=false) {
    try {
      const link = this.url + params;
      const response = await axios.get(link);
      if (isStatus) {
        this.status(response);
      }
      return response.data
    } 
    catch (error) {
      console.error(error);
    }
  }

  async makePost(params={}, isStatus=false) {
    try {
      const response = await axios.post(this.url, params);
      if (isStatus) {
        this.status(response);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  async makeDelete(params='', isStatus=false) {
    try {
      const link = this.url + params;
      const response = await axios.delete(link);
      if (isStatus) {
        this.status(response);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  async makeUpdate(params={}, isStatus=false) {
    try {
      const link = this.url + params.path;
      const response = await axios.patch(link, params.config);
      if (isStatus) {
        this.status(response);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}
export default Api;