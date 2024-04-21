import apiSlice from "./api/api";
import { SEND_REQUEST, ALL_REQUEST, ACCEPT_REQUEST } from "./CONSTANTS";

const fiendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendFriendReq: builder.mutation({
      query: (data) => ({
        url: SEND_REQUEST,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Friend"],
    }),

    acceptReq: builder.mutation({
      query: (data) => ({
        url: ACCEPT_REQUEST,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Friend", "User"],
    }),

    getAllReq: builder.query({
      query: () => ({
        url: ALL_REQUEST,
        method: "GET",
      }),
      providesTags: ["Friend"],
    }),
  }),
});

export const {
  useSendFriendReqMutation,
  useAcceptReqMutation,
  useGetAllReqQuery,
} = fiendsApiSlice;
