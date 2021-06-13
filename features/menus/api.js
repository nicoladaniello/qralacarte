import { createApi } from '@reduxjs/toolkit/query/react'
import menusService from "../../services/MenuService";
import { toast } from "react-toastify";

// Define a service using a base URL and expected endpoints
export const menusApi = createApi({
  reducerPath: "menusApi",
  tagTypes: ["Menus"],
  endpoints: (builder) => ({
    getMenu: builder.query({
      queryFn: (_key) => menusService.get(_key),
      providesTags: (result, error, _key) => [{ type: "Menus", id: _key }],
    }),
    getAllMenus: builder.mutation({
      queryFn: (options) => menusService.getAll(options),
      providesTags: (result) =>
        result
          ? result.map(({ _key }) => ({ type: "Menus", id: _key }))
          : ["Menus"],
    }),
    insertMenu: builder.mutation({
      queryFn: (data) => menusService.insert(data),
    }),
    updateMenu: builder.mutation({
      queryFn: (data) => menusService.update(data),
      onSuccess: () => toast("Modifiche salvate!"),
      providesTags: (result, error, { _key }) => [{ type: "Menus", id: _key }],
    }),
    upsertMenu: builder.mutation({
      queryFn: (data) => menusService.upsert(data),
      providesTags: (result, error, { _key }) => [{ type: "Menus", id: _key }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMenuQuery,
  useGetAllMenusMutation,
  useInsertMenuMutation,
  useUpdateMenuMutation,
  useUpsertMenuMutation,
} = menusApi;
