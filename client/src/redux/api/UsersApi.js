import { apiSlice } from "./SliceApi";
import { USERS_URL } from "../features/Constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation ({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/logout`,
              method: "POST",
            }),
          }),
          register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/register`,
              method: "POST",
              body: data,
            }),
          }),
          profile: builder.query({
            query: () => ({
              url: `${USERS_URL}/profile`,
              method: "GET",
            }),
          }),
          getUsers: builder.query({
            query: () => ({
              url: [USERS_URL],
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
          }),
          deleteUser: builder.mutation({
            query: (id) => ({
              url: `${USERS_URL}/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ['User'],
          }),
    })
})

// endpoint hook
// `use${Login}Mutation` //how react redux works.
export const {useLoginMutation, useLogoutMutation, useRegisterMutation, userProfileMutation} = userApiSlice