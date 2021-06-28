import { createApi } from "@reduxjs/toolkit/query/react";
import { Slide, toast } from "react-toastify";
import {
  mergeAnonymousToExistingUser,
  signInAnonymously,
  signInWithCredentials,
} from "../../services/userService";
import menusApi from "../menus/api";

export const userType = "User";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: [userType],
  endpoints: (builder) => ({
    signInWithCredentials: builder.mutation({
      queryFn: (cred) => signInWithCredentials(cred),
    }),
    signInAnonymously: builder.mutation({
      queryFn: () => signInAnonymously(),
    }),
    mergeAnonymousToExistingUser: builder.mutation({
      queryFn: async (cred) => mergeAnonymousToExistingUser(cred),
      onQueryStarted: async (arg, api) => {
        try {
          toast(
            <div>
              <p>Merging menus...</p>
              <Loading />
            </div>,
            {
              toastId: api.requestId,
              autoClose: false,
              position: "bottom-right",
            }
          );
          
          await api.queryFulfilled;

          toast.update(api.requestId, {
            render: "Menus merged successfully",
            autoClose: true,
            transition: Slide,
            delay: "2000",
          });

          // Invalidate menus
          console.log("Invalidating menus after merging");
          api.dispatch(
            menusApi.util.invalidateTags([{ type: menuType, id: "USER_MENUS" }])
          );
        } catch (error) {
          toast.update(api.requestId, {
            render: "Error while merging the menus.",
            autoClose: true,
            transition: Slide,
            delay: "2000",
          });
        }
      },
    }),
  }),
});

export const {
  useSignInWithCredentialsMutation,
  useSignInAnonymouslyMutation,
  useMergeAnonymousToExistingUserMutation,
} = usersApi;

export default usersApi;
