import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserCredentials,
  signOutAction,
} from "../../features/auth/slice";
import { onAuthStateChanged } from "../../services/authService";

const useAuth = (options) => {
  const { currentUser, isInitialized, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const { redirectTo } = options || {};

  useEffect(() => {
    if (redirectTo && isInitialized && !isLoggedIn) {
      router.push(redirectTo);
    }
  }, [redirectTo, isInitialized, isLoggedIn, router]);

  const signIn = ({ uid, email, displayName }) =>
    dispatch(setUserCredentials({ uid, email, displayName }));

  const signOut = () => dispatch(signOutAction());

  return {
    currentUser,
    isInitialized,
    isLoggedIn,
    signIn,
    signOut,
    onAuthStateChanged,
  };
};

export default useAuth;
