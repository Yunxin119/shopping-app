import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts: builder.query({
            query: ({keyword, pageNumber}) => ({
                url: `${PRODUCTS_URL}`,
                params: { keyword, pageNumber }
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
            invalidatesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        uploadImage: builder.mutation({
            query: (data) => ({
                url:`${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            }),
            providesTags: ['Product'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        getCarousel: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { 
    useGetProductsQuery, 
    useGetProductDetailQuery, 
    useGetAllProductsQuery, 
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetCarouselQuery
 } = productApiSlice;