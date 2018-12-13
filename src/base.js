import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDV-BtnDwHdQQamxsg5-USBbRuhRFM4Ji4",
  authDomain: "pizza-love.firebaseapp.com",
  databaseURL: "https://pizza-love.firebaseio.com",
  projectId: "pizza-love",
  storageBucket: "pizza-love.appspot.com",
  messagingSenderId: "778836917849"
});

const base = Rebase.createClass(firebaseApp.database());

// Named Export
export { firebaseApp };

//Main export
export default base;
