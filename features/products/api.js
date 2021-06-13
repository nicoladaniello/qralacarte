import { createApi } from "@reduxjs/toolkit/query/react";
import { Slide, toast } from "react-toastify";
import productService from "../../services/ProductService";

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
export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      queryFn: ({ menuId, productId }) => productService.get(menuId, productId),
      providesTags: (result, error, arg) => [
        { type: "Products", id: `${arg.menuId}-${arg.productId}` },
      ],
    }),
    getAllProducts: builder.query({
      queryFn: ({ menuId, options }) => productService.getAll(menuId, options),
      providesTags: (result) => [
        { type: "Products", id: "LIST" },
        ...result.map(({ _key }) => ({ type: "Products", id: _key })),
      ],
    }),
    insertProduct: builder.mutation({
      queryFn: ({ menuId, data }) => productService.insert(menuId, data),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Salvataggio prodotto...",
          onSuccess: "Prodotto salvato!",
          onError: "Errore durante il salvataggio del prodotto.",
        }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      queryFn: ({ menuId, data }) => productService.update(menuId, data),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Modificando prodotto...",
          onSuccess: "Modifiche salvate con successo!",
          onError: "Errore durante la modificha del prodotto.",
        }),
      invalidatesTags: (result, error, arg) => [
        { type: "Products", id: `${arg.menuId}-${result._key}` },
      ],
    }),
    upsertProduct: builder.mutation({
      queryFn: ({ menuId, data }) => productService.upsert(menuId, data),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          isLoading: "Salvataggio prodotto...",
          isSuccess: "Prodotto salvato con successo!",
          isError: "Errore durante il salvataggio del prodotto.",
        }),
      invalidatesTags: (result, error, arg) => [
        { type: "Products", id: `${arg.menuId}-${result._key}` },
        { type: "Products", id: "LIST" },
      ],
    }),
    deleteProduct: builder.mutation({
      queryFn: ({ menuId, data }) => productService.remove(menuId, data),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          isLoading: "Eliminando prodotto...",
          isSuccess: "Prodotto eliminato con successo!",
          isError: "Errore durante l'eliminazione del prodotto.",
        }),
      invalidatesTags: (result, error, arg) => [
        { type: "Products", id: `${arg.menuId}-${arg.data._key}` },
        { type: "Products", id: "LIST" },
      ],
    }),
    addProductImage: builder.mutation({
      queryFn: ({ menuId, productId, file }) =>
        productService.addImage(menuId, productId, file),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          isLoading: "Salvataggio immagine...",
          isSuccess: "Immagine salvata con successo!",
          isError: "Errore durante il salvataggio dell'immagine.",
        }),
      invalidatesTags: (result, error, arg) => [
        { type: "Products", id: `${arg.menuId}-${result._key}` },
        { type: "Products", id: "LIST" },
      ],
    }),
    deleteProductImage: builder.mutation({
      queryFn: ({ menuId, productId }) =>
        productService.deleteImage(menuId, productId),
      onQueryStarted: (arg, { queryFulfilled, requestId }) =>
        showMessages(api, {
          isLoading: "Eliminazione immagine...",
          isSuccess: "Immagine eliminata con successo!",
          isError: "Errore durante l'eliminazione dell'immagine.",
        }),
      invalidatesTags: (result, error, arg) => [
        { type: "Products", id: `${arg.menuId}-${arg.productId}` },
        { type: "Products", id: "LIST" },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductQuery,
  useGetAllProductsQuery,
  useInsertProductMutation,
  useUpdateProductMutation,
  useUpsertProductMutation,
  useDeleteProductMutation,
  useAddProductImageMutation,
  useDeleteProductImageMutation,
} = productsApi;
