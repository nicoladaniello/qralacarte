import { createApi } from '@reduxjs/toolkit/query/react'
import { toast } from "react-toastify";
import venuesService from "../../services/venueService";

// Define a service using a base URL and expected endpoints
export const venuesApi = createApi({
  reducerPath: "venuesApi",
  tagTypes: ["Venues"],
  endpoints: (builder) => ({
    getVenue: builder.mutation({
      queryFn: (key) => venuesService.get(key),
      providesTags: (result, error, _key) => [{ type: "Venues", id: _key }],
    }),
    getAllVenues: builder.mutation({
      queryFn: (options) => venuesService.getAll(options),
      providesTags: (result) =>
        result
          ? result.map(({ _key }) => ({ type: "Venues", id: _key }))
          : ["Venues"],
    }),
    insertVenue: builder.mutation({
      queryFn: (data) => venuesService.insert(data),
    }),
    updateVenue: builder.mutation({
      queryFn: (data) => venuesService.update(data),
      onSuccess: () => toast("Modifiche salvate!"),
      providesTags: (result, error, { _key }) => [{ type: "Venues", id: _key }],
    }),
    upsertVenue: builder.mutation({
      queryFn: (data) => venuesService.upsert(data),
      providesTags: (result, error, { _key }) => [{ type: "Venues", id: _key }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetVenueMutation,
  useGetAllVenuesMutation,
  useInsertVenueMutation,
  useUpdateVenueMutation,
  useUpsertVenueMutation,
} = venuesApi;
