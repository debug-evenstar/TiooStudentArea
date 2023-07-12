// import { store } from "@/shared/redux/store";

import { store } from "../redux/store";


export const extractCallBackRoute = (path: string) => {
  if (path === "/auth/login") return "/user";
  if (path === "/auth/signup") return "/user";
  const indexOfQ = path.indexOf("?");
  if (indexOfQ) return path.slice(0, indexOfQ);
  return "/";
};

export const requestAuthorization = () => {
    const appState = store.getState();
    return appState && appState.user && appState.user.user
      ? `Bearer ${appState.user.user.token}`
      : "";
  };

export const storeLocalToken = (key: string, data: any) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(data));
      }
}

export const getLocalToken = (key: string) => {
    if (typeof window !== "undefined") {
        const storageItem = window.localStorage.getItem(key);
        if (storageItem) return JSON.parse(storageItem);
        return null;
      }
      return null;
}