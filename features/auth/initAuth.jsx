import { toast } from "react-toastify";
import firebase from "../../firebase/firebaseClient";
import store from "../../store";
import { setUserAnonymous, setUserCredentials } from "./slice";

function initAuth() {
  firebase.auth().onAuthStateChanged(
    (user) => {
      const { uid, email, displayName } = user || {};
      // console.log("user changed.", user);
      if (user) store.dispatch(setUserCredentials({ uid, email, displayName }));
      else store.dispatch(setUserAnonymous());
    },
    (err) => {
      store.dispatch(setUserAnonymous());
      toast("An error occurred while checcking user credentials.");
      console.error(err);
    }
  );
}

export default initAuth;
