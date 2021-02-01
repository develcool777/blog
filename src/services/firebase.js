const firebase = require('firebase/app');
require("firebase/firestore");
require('firebase/storage');

// const firebaseConfig = {
//   apiKey: "AIzaSyCv8vvXtMjD18ZZ8NcEXF14sZqRq0eupwo",
//   authDomain: "blog-3cf00.firebaseapp.com",
//   projectId: "blog-3cf00",
//   storageBucket: "blog-3cf00.appspot.com",
//   messagingSenderId: "323554552816",
//   appId: "1:323554552816:web:c0b30792c2088be79d0b35",
//   measurementId: "G-07ESQL3DVJ"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

class Firebase {
  constructor() {
  }
  async getData(location) {
    if (typeof location !== 'string') {
      throw Error(`Firebase.getData() location must be string`);
    }
    console.log("11111");
    const db = firebase.firestore();
    console.log("22222");
    const collection = await db.collection(location).get();
    console.log(collection);
    const res = []
    collection.docs.forEach(doc => {
      res.push(doc.data())
    })
    return res;
  }

  async getImages(location) {
    if (typeof location !== 'string') {
      throw Error(`Firebase.getImages() location must be string`);
    }
    const storageImgs = firebase.storage().ref(location);
    const imgNames = (await storageImgs.listAll()).items.map(i => i.name);
    const promises = imgNames.map(async name => {
      const itemRef = storageImgs.child(name);
      const res = await itemRef.getDownloadURL();
      return res;
    })
    const res = await Promise.all(promises);
    return res;
  }

  merge(data, imgs) {
    imgs.forEach((url, i) => {
      data[i].img = url;
    })
    return data;
  }
}
export default Firebase;