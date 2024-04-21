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
    }),

    acceptReq: builder.mutation({
      query: (data) => ({
        url: ACCEPT_REQUEST,
        method: "PATCH",
        body: data,
      }),
    }),

    getAllReq: builder.query({
      query: () => ({
        url: ALL_REQUEST,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSendFriendReqMutation,
  useAcceptReqMutation,
  useGetAllReqQuery,
} = fiendsApiSlice;
