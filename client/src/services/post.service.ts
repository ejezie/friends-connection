import apiSlice from "./api/api";
import { POSTS, CREATE_POST, LIKE_POST, USER_POST } from "./CONSTANTS";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: CREATE_POST,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    likePost: builder.mutation({
      query: (id) => ({
        url: `${LIKE_POST}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),

    getPost: builder.query({
      query: (id) => ({
        url: `${POSTS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    getAllPosts: builder.query({
      query: () => ({
        url: POSTS,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    getUserPost: builder.query({
      query: (id) => ({
        url: `${USER_POST}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useLikePostMutation,
  useGetPostQuery,
  useGetAllPostsQuery,
  useGetUserPostQuery,
} = postApiSlice;
