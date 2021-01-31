const firebase = require('firebase/app');
// import firebase from 'firebase/app'; 
require('firebase/firestore');
require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyCv8vvXtMjD18ZZ8NcEXF14sZqRq0eupwo",
  authDomain: "blog-3cf00.firebaseapp.com",
  projectId: "blog-3cf00",
  storageBucket: "blog-3cf00.appspot.com",
  messagingSenderId: "323554552816",
  appId: "1:323554552816:web:c0b30792c2088be79d0b35",
  measurementId: "G-07ESQL3DVJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const worksData = []

async function getData() {
  const db = firebase.firestore();
  // db.settings({timestampsInSnapshots: true});
  const res = await db.collection('myWorks').get();
  res.docs.forEach(doc => {
    worksData.push(doc.data())
  })
}

async function getImages() {
  const storageImgs = firebase.storage().ref('myWork');
  const imgNames = (await storageImgs.listAll()).items.map(i => i.name)
  const promises = imgNames.map(async name => {
    const itemRef = storageImgs.child(name);
    const res = await itemRef.getDownloadURL();
    return res;
  })
  this.imgs = await Promise.all(promises);
  console.log('imgs');
  merge();
}

function merge() {
  this.imgs.forEach((url, i) => {
    worksData[i].img = url
  })
  console.log(worksData)
}
getData()
getImages()