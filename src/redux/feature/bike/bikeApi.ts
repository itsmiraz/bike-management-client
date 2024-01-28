import { baseApi } from "@/redux/api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBikes: builder.query({
      query: query => {
        return {
          url: `/bike`,
          params: query,
          method: "GET",
        };
      },
      providesTags: ["bike"],
    }),
    addNewBike: builder.mutation({
      query: payload => ({
        url: "/bike/post-bike",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["bike"],
    }),
    updateBike: builder.mutation({
      query: payload => ({
        url: `/bike/update-bike/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["bike"],
    }),
    deleteBike: builder.mutation({
      query: payload => ({
        url: "/bike/delete-bike",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["bike"],
    }),
  }),
});

export const {
  useAddNewBikeMutation,
  useGetBikesQuery,
  useDeleteBikeMutation,
  useUpdateBikeMutation,
} = bikeApi;
