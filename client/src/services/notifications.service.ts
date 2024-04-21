import apiSlice from "./api/api";
import { NOTIFICATIONS } from "./CONSTANTS";

const notifcationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markNotification: builder.mutation({
      query: (data) => ({
        url: NOTIFICATIONS,
        method: "PATCH",
        body: data,
      }),
    }),

    getNotifications: builder.query({
      query: () => ({
        url: NOTIFICATIONS,
        method: "GET",
      }),
    }),
  }),
});

export const { useMarkNotificationMutation, useGetNotificationsQuery } =
  notifcationApiSlice;
