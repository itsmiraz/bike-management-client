import { baseApi } from "@/redux/api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSale: builder.mutation({
      query: paylaod => ({
        url: "/sale/create-sale",
        method: "POST",
        body: paylaod,
      }),
      invalidatesTags: ["bike"],
    }),
    getHistory: builder.query({
      query: query => ({
        url: "/sale/sales-history",
        method: "GET",
        params: query,
      }),
    }),
  }),
});

export const { useCreateSaleMutation, useGetHistoryQuery } = saleApi;
