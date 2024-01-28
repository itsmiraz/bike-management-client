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
  }),
});

export const { useCreateSaleMutation } = saleApi;
