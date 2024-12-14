import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getMetaData: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: '/onboarding/metadata',
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,

    }),

    saveExamMetaData: builder.mutation<any | ErrorResult, any>({
      query: (payload: any) => ({
        url: `/onboarding/save-exam-metadata`,
        method: ENDPOINT.HTTP_METHODS.POST,
        body: payload,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      // invalidatesTags: [''] as any
    }),

    getExams: builder.query<any | ErrorResult, string | undefined>({
      query: (type) => ({
        url: type ? `/exams?type=${type}` : '/exams',
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),


    getNotifications: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: `fsfs`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getStudentShelf: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: "front/student/shelf/get-books",
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
        // providesTags: () =>  ['Books'] as any,
      }),
      providesTags: ['Books'] as any,
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),


    getLibraryBooks: builder.query<any | ErrorResult, any>({
      query: () => ({
        url: `/front/student/textbook/librarytextbooks`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      providesTags: ['Books'] as any
    }),

    addToStudentShelf: builder.mutation<any | ErrorResult, any>({
      query: (payload) => ({
        url: `/front/student/shelf/add-book`,
        method: ENDPOINT.HTTP_METHODS.POST,
        body: payload,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      invalidatesTags: ['Books'] as any
    }),

    removeFromStudentShelf: builder.mutation<any | ErrorResult, any>({
      query: (payload) => ({
        url: `/front/student/shelf/remove-book`,
        method: ENDPOINT.HTTP_METHODS.POST,
        body: payload,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      invalidatesTags: ['Books'] as any,
    }),
  }),
  overrideExisting: true,
});