import { apiSlice } from "./SliceApi.js";
import { CATEGORY_URL } from "../features/Constants.js";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}/`,
        method: "POST",
        body: newCategory,
      }),
    }),
    // update category
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    // delete category
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
    // fetch all
    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
    }),
  }),
});

export const { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery } = categoryApiSlice;