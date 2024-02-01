import { baseApi } from "@/redux/api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSale: builder.mutation({
      query: paylaod => ({
        url: `/sale/create-sale/${paylaod.id}`,
        method: "POST",
        body: paylaod.data,
      }),
      invalidatesTags: ["bike", "history"],
    }),
    getHistory: builder.query({
      query: query => ({
        url: "/sale/sales-history",
        method: "GET",
        params: query,
      }),
      providesTags: ["history"],
    }),
  }),
});

export const { useCreateSaleMutation, useGetHistoryQuery } = saleApi;
