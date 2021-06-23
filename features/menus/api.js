import { createApi } from "@reduxjs/toolkit/query/react";
import { Slide, toast } from "react-toastify";
import {
  createMenu,
  deleteMenuImage,
  deleteProduct,
  deleteProductImage,
  deleteSection,
  getFullMenu,
  getMenuSectionsAndProducts,
  getUserMenus,
  updateMenuInfo,
  uploadMenuImage,
  uploadProductImage,
  upsertProduct,
  upsertSection,
} from "../../services/menuService";

export const menuType = "Menu";
export const sectionType = "Menu";
export const productType = "Menu";

// Show an updatable toast message.
async function showMessages(
  { queryFulfilled, requestId },
  { onLoading, onSuccess, onError }
) {
  toast(onLoading, { toastId: requestId });
  try {
    await queryFulfilled;
    toast.update(requestId, {
      transition: Slide,
      render: onSuccess,
    });
  } catch (error) {
    toast.update(requestId, {
      transition: Slide,
      render: onError,
    });
  }
}

// Define a service using a base URL and expected endpoints
export const menusApi = createApi({
  reducerPath: "menusApi",
  tagTypes: [menuType, sectionType, productType],
  endpoints: (builder) => ({
    getUserMenus: builder.query({
      queryFn: (userId) => getUserMenus(userId),
      providesTags: (result) => [
        { type: menuType, id: "USER_MENUS" },
        ...result.map((m) => ({ type: menuType, id: m._key })),
      ],
    }),
    getFullMenu: builder.query({
      queryFn: (id) => getFullMenu(id),
      providesTags: ({ _key, sections, products }) => [
        { type: menuType, id: _key },
        ...sections.map((s) => ({ type: sectionType, id: s._key })),
        ...products.map((p) => ({ type: productType, id: p._key })),
      ],
    }),
    getMenuSectionsAndProducts: builder.query({
      queryFn: (menuId) => getMenuSectionsAndProducts(menuId),
      providesTags: ({ sections, products }) => [
        ...sections.map((s) => ({ type: sectionType, id: s._key })),
        ...products.map((p) => ({ type: productType, id: p._key })),
      ],
    }),
    createMenu: builder.mutation({
      queryFn: (data) => createMenu(data),
      invalidatesTags: ({ _key }) => [
        { type: menuType, id: "USER_MENUS" },
        { type: menuType, id: _key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Creating your menu...",
          onSuccess: "Menu created!",
          onError: "Error while creating the menu.",
        }),
    }),
    updateMenuInfo: builder.mutation({
      queryFn: (data) => updateMenuInfo(data),
      invalidatesTags: ({ _key }) => [{ type: menuType, id: _key }],
      onQueryStarted: (data, api) =>
        showMessages(api, {
          onLoading: "Updating menu...",
          onSuccess: "Menu updated!",
          onError: "Error while updating the menu.",
        }),
    }),
    invalidateCachedMenu: builder.mutation({
      queryFn: (menuId) => ({ data: { menuId } }),
      invalidatesTags: (result, error, menuId) => [
        { type: menuType, id: menuId },
      ],
    }),
    uploadMenuImage: builder.mutation({
      queryFn: ({ menu, fileUrl }) => uploadMenuImage(menu, fileUrl),
      invalidatesTags: (result, error, { menu }) => [
        { type: menuType, id: menu._key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Uploading image...",
          onSuccess: "Image uploaded!",
          onError: "Error while uploading the image.",
        }),
    }),
    deleteMenuImage: builder.mutation({
      queryFn: (menu) => deleteMenuImage(menu),
      invalidatesTags: (result, error, { _key }) => [
        { type: menuType, id: _key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Deleting image...",
          onSuccess: "Image deleteted!",
          onError: "Error while deleting the image.",
        }),
    }),
    upsertSection: builder.mutation({
      queryFn: (data) => upsertSection(data),
      invalidatesTags: ({ _key, _menuKey }) => [
        { type: menuType, id: _menuKey },
        { type: sectionType, id: _key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Saving section...",
          onSuccess: "Section saved!",
          onError: "Error while saving the section.",
        }),
    }),
    deleteSection: builder.mutation({
      queryFn: (section) => deleteSection(section),
      invalidatesTags: ({ _key, _menuKey }) => [
        { type: menuType, id: _menuKey },
        { type: sectionType, id: _key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Deleting section...",
          onSuccess: "Section deleted!",
          onError: "Error while deleting the section.",
        }),
    }),
    upsertProduct: builder.mutation({
      queryFn: (data) => upsertProduct(data),
      invalidatesTags: ({ _key, _menuKey }) => [
        { type: menuType, id: _menuKey },
        { type: productType, id: _key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Saving product...",
          onSuccess: "Product saved!",
          onError: "Error while saving the product.",
        }),
    }),
    deleteProduct: builder.mutation({
      queryFn: (product) => deleteProduct(product),
      invalidatesTags: ({ _key, _menuKey }) => [
        { type: menuType, id: _menuKey },
        { type: productType, id: _key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Deleting product...",
          onSuccess: "Product deleted!",
          onError: "Error while deleting the product.",
        }),
    }),
    uploadProductImage: builder.mutation({
      queryFn: ({ product, fileUrl }) => uploadProductImage(product, fileUrl),
      invalidatesTags: (result, error, { product }) => [
        { type: menuType, id: product._menuKey },
        { type: productType, id: product._key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Uploading image...",
          onSuccess: "Image uploaded!",
          onError: "Error while uploading the image.",
        }),
    }),
    deleteProductImage: builder.mutation({
      queryFn: (product) => deleteProductImage(product),
      invalidatesTags: (result, error, { _menuKey, _key }) => [
        { type: menuType, id: _menuKey },
        { type: productType, id: _key },
      ],
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Deleting image...",
          onSuccess: "Image deleteted!",
          onError: "Error while deleting the image.",
        }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserMenusQuery,
  useGetFullMenuQuery,
  useCreateMenuMutation,
  useUpdateMenuInfoMutation,
  useInvalidateCachedMenuMutation,
  useUploadMenuImageMutation,
  useDeleteMenuImageMutation,
  useUpsertSectionMutation,
  useDeleteSectionMutation,
  useUpsertProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
} = menusApi;

export default menusApi;
