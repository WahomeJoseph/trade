import { apiSlice } from "./SliceApi";
import { USERS_URL } from "../features/Constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    // logout
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    // register : create account
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    // get profile
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    // get user
    getUsers: builder.query({
      query: () => ({
        url: [USERS_URL],
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    // delete
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    // get user details
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // update user profile
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useDeleteUserMutation, useGetUserDetailsQuery, useGetUsersQuery, useUpdateUserMutation } = userApiSlice