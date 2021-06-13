import { createApi } from "@reduxjs/toolkit/query/react";
import { Slide, toast } from "react-toastify";
import sectionService from "../../../services/sectionService";

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
export const sectionsApi = createApi({
  reducerPath: "sectionsApi",
  tagTypes: ["Sections"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      queryFn: ({ menuId, productId }) => sectionService.get(menuId, productId),
      providesTags: (result, error, arg) => [
        { type: "Sections", id: `${arg.menuId}-${arg.productId}` },
      ],
    }),
    getAllSections: builder.query({
      queryFn: ({ menuId, options }) => sectionService.getAll(menuId, options),
      providesTags: (result) => [
        { type: "Sections", id: "LIST" },
        ...result.map(({ _key }) => ({ type: "Sections", id: _key })),
      ],
    }),
    insertSection: builder.mutation({
      queryFn: ({ menuId, data }) => sectionService.insert(menuId, data),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Salvataggio prodotto...",
          onSuccess: "Prodotto salvato!",
          onError: "Errore durante il salvataggio del prodotto.",
        }),
      invalidatesTags: [{ type: "Sections", id: "LIST" }],
    }),
    updateSection: builder.mutation({
      queryFn: ({ menuId, data }) => sectionService.update(menuId, data),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          onLoading: "Modificando prodotto...",
          onSuccess: "Modifiche salvate con successo!",
          onError: "Errore durante la modificha del prodotto.",
        }),
      invalidatesTags: (result, error, arg) => [
        { type: "Sections", id: `${arg.menuId}-${result._key}` },
      ],
    }),
    upsertSection: builder.mutation({
      queryFn: ({ menuId, data }) => sectionService.upsert(menuId, data),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          isLoading: "Salvataggio prodotto...",
          isSuccess: "Prodotto salvato con successo!",
          isError: "Errore durante il salvataggio del prodotto.",
        }),
      invalidatesTags: (result, error, arg) => [
        { type: "Sections", id: `${arg.menuId}-${result._key}` },
        { type: "Sections", id: "LIST" },
      ],
    }),
    deleteSection: builder.mutation({
      queryFn: ({ menuId, data }) => sectionService.remove(menuId, data),
      onQueryStarted: (arg, api) =>
        showMessages(api, {
          isLoading: "Eliminando prodotto...",
          isSuccess: "Prodotto eliminato con successo!",
          isError: "Errore durante l'eliminazione del prodotto.",
        }),
      invalidatesTags: (result, error, arg) => [
        { type: "Sections", id: `${arg.menuId}-${arg.data._key}` },
        { type: "Sections", id: "LIST" },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductQuery,
  useGetAllSectionsQuery,
  useInsertSectionMutation,
  useUpdateSectionMutation,
  useUpsertSectionMutation,
  useDeleteSectionMutation,
} = sectionsApi;
