import { store } from "@/redux/store";

export const useAuth = () => {
  // get the user from redux store
  const token = store.getState().user.token;

  if (token) {
    return {
      auth: true,
    };
  } else {
    return {
      auth: false,
    };
  }
};
