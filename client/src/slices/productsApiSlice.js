import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}`,
            }),
            keepUnusedDataFor:5
        }),
        getProductDetail: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`
            }),
            keepUnusedDataFor: 5
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useGetProductsQuery, useGetProductDetailQuery, useGetAllProductsQuery } = productApiSlice;