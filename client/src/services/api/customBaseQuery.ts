import { fetchBaseQuery, BaseQueryApi } from "@reduxjs/toolkit/query/react";
import environmentConfig from "@/config/env.config";
import { RootState } from "@/types";
import { logoutUser } from "@/redux/slices/user.slice";
// import { openModal, closeComponentModal } from "@/redux/slices/modal.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: environmentConfig.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const typedGetState = getState() as RootState;
    const token = typedGetState.user.token;
    // console.log(`Token: ${token}`);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery = async (
  args: Parameters<typeof baseQuery>[0],
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);
  // console.log(result, "*res");

  if (result.error && result.error.status === 401) {
    api.dispatch(logoutUser());
  }

  return result;
};

export default customBaseQuery;
