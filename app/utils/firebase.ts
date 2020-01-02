import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDNuUv-ULY7JwCOp-5M2VTEXD1fJw1x8os",
  authDomain: "tenedores-1050a.firebaseapp.com",
  databaseURL: "https://tenedores-1050a.firebaseio.com",
  projectId: "tenedores-1050a",
  storageBucket: "tenedores-1050a.appspot.com",
  messagingSenderId: "239459599636",
  appId: "1:239459599636:web:abd093dcf93ce2938e6e01"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.database();
