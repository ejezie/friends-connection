import apiSlice from "./api/api";
import { LOGIN } from "./CONSTANTS";
import { updateUser } from "@/redux/slices/user.slice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { token } = data.data;
          const { data: user } = data;

          dispatch(
            updateUser({
              token,
              user,
            })
          );
        } catch (error) {
          return;
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
