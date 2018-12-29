import firebase from "firebase/app";
import "firebase/database";
import Rebase from "re-base";

const config = {
  apiKey: "AIzaSyDV-BtnDwHdQQamxsg5-USBbRuhRFM4Ji4",
  authDomain: "pizza-love.firebaseapp.com",
  databaseURL: "https://pizza-love.firebaseio.com",
  projectId: "pizza-love",
  storageBucket: "pizza-love.appspot.com",
  messagingSenderId: "778836917849"
};

const firebaseApp = firebase.initializeApp(config);

// Named Export
export { firebaseApp };

//Main export
export default Rebase.createClass(firebaseApp.database());
