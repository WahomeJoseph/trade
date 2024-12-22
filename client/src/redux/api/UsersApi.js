import { apiSlice } from "./SliceApi";
import { USERS_URL } from "../features/Constants";

export const userApiSlice = apiSlice.injectEndpoint({
    endpoints: (builder) => ({
        login: builder.mutation ({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            })
        })
    })
})

// endpoint hook
// `use${Login}Mutation` //how react redux works.
export const {useLoginMutation} = userApiSlice