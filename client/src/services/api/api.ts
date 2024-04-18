import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
  // refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 50000,
  refetchOnReconnect: true,
});
export default apiSlice;
