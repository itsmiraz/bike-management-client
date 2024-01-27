import { baseApi } from "@/redux/api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addNewBike: builder.mutation({
      query: payload => ({
        url: "/bike/post-bike",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAddNewBikeMutation } = bikeApi;
