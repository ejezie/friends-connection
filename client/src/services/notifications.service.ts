import apiSlice from "./api/api";
import { NOTIFICATIONS } from "./CONSTANTS";

const notifcationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markNotification: builder.mutation({
      query: ({ data }) => ({
        url: `${NOTIFICATIONS}/${data}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: NOTIFICATIONS,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
  }),
});

export const { useMarkNotificationMutation, useGetNotificationsQuery } =
  notifcationApiSlice;
