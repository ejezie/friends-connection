import apiSlice from "./api/api";
import { LOGIN, ME, NOT_FRIENDS, RESGISTER, USERS } from "./CONSTANTS";
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
          const { token } = data;

          dispatch(
            updateUser({
              token: token.accessToken,
              user: token.newUser,
            })
          );
        } catch (error) {
          return;
        }
      },
      invalidatesTags: ["Friend", "Notification", "Post", "User"],
    }),

    register: builder.mutation({
      query: (data) => ({
        url: RESGISTER,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { token } = data;

          dispatch(
            updateUser({
              token: token.accessToken,
              user: token.newUser,
            })
          );
        } catch (error) {
          return;
        }
      },
      invalidatesTags: ["Friend", "Notification", "Post", "User"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: USERS,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getMe: builder.query({
      query: () => ({
        url: ME,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getNotFriend: builder.query({
      query: () => ({
        url: NOT_FRIENDS,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `${USERS}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAllUsersQuery,
  useGetMeQuery,
  useGetNotFriendQuery,
  useGetSingleUserQuery,
  useRegisterMutation,
} = authApiSlice;
