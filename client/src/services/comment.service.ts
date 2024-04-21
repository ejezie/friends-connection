import apiSlice from "./api/api";
import { MAKE_COMMENT, REPLY_COMMENT, GET_POST_COMMENT } from "./CONSTANTS";

const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeComment: builder.mutation({
      query: (data) => ({
        url: MAKE_COMMENT,
        method: "POST",
        body: data,
      }),
    }),

    replyComment: builder.mutation({
      query: (data) => ({
        url: REPLY_COMMENT,
        method: "PATCH",
        body: data,
      }),
    }),

    getPostComments: builder.query({
      query: (id) => ({
        url: `${GET_POST_COMMENT}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useMakeCommentMutation,
  useReplyCommentMutation,
  useGetPostCommentsQuery,
} = commentApiSlice;
