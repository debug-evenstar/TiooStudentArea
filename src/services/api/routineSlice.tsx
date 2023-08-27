
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import {  StudentLoginResult } from "../../utils/dataTypes/auth";
import { ErrorResult } from "../../utils/dataTypes";

export const routineApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClass: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.FETCH_CLASS_PUPIL}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
            Authorization: requestAuthorization(),
          },
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getClassMates: builder.query<any | ErrorResult, string>({
      query: (param) => ({
        url: `${ENDPOINT.FETCH_CLASSMATE}/${param}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
            Authorization: requestAuthorization(),
          },
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getUpcomingLesson: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.FETCH_COMING_LESSON}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
            Authorization: requestAuthorization(),
          },
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetClassQuery,
  useGetClassMatesQuery,
  useGetUpcomingLessonQuery,
} = routineApiSlice;