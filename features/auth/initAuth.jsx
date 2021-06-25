import { toast } from "react-toastify";
import firebase from "../../firebase/firebaseClient";
import store from "../../store";
import { restoreDeveloperAccount } from "../development/slice";
import { setUserAnonymous, setUserCredentials } from "./slice";

function initAuth() {
  firebase.auth().onAuthStateChanged(
    async (user) => {
      if (!user) {
        store.dispatch(setUserAnonymous());
        return;
      }

      if (
        process.env.NEXT_PUBLIC_DEVELOPMENT &&
        email === process.env.NEXT_PUBLIC_DEVELOPER_ACCOUNT
      ) {
        store.dispatch(restoreDeveloperAccount());
      }

      const { signInProvider } = await user.getIdTokenResult();
      const { uid, email, displayName } = user;
      const appUser = { uid, email, displayName, signInProvider };

      // console.log("user changed.", user);
      store.dispatch(setUserCredentials(appUser));
    },
    (err) => {
      store.dispatch(setUserAnonymous());
      toast("An error occurred while checcking user credentials.");
      console.error(err);
    }
  );
}

export default initAuth;
