import { useSelector } from "react-redux";
import firebase from "../../firebase/firebaseClient";
import { selectAuth } from "./slice";

const useAuth = () => {
  const { currentUser, status } = useSelector(selectAuth);

  const signOut = () => firebase.auth().signOut();

  return {
    currentUser,
    status,
    signOut,
  };
};

export default useAuth;
