import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";

export const examsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    saveExamMetaData: builder.mutation<any | ErrorResult, any>({
      query: (payload: any) => ({
        url: `/onboarding/save-exam-metadata`,
        method: ENDPOINT.HTTP_METHODS.POST,
        body: payload,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
    }),

    getExam: builder.query<any | ErrorResult, string | undefined>({
      query: (id) => ({
        url: `/exams/${id}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.DEFAULT,
    }),

    getExams: builder.query<any | ErrorResult, string | undefined>({
      query: (type) => ({
        url: `/exams?type=${type}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.MEDIUM,
    }),

    getAccountExams: builder.query<any, any>({
      query: () => ({
        url: `/exams/account`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      providesTags: ['UserExams'] as any,
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.DEFAULT,
    }),

    registerExam: builder.mutation<any, any>({
      query: (payload: any) => ({
        url: `/exams/register/${payload.id}`,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
          Authorization: requestAuthorization(),
        },
        body: payload.data,
      }),
      invalidatesTags: ['UserExams'] as any,
    }),

    registerExams: builder.mutation<any, any>({
      query: (payload: any) => ({
        url: `/exams/register`,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
          Authorization: requestAuthorization(),
        },
        body: payload,
      }),
      invalidatesTags: ['UserExams'] as any, // This ensures getAccountExams is refetched
    }),

    unregisterExam: builder.mutation<any, any>({
      query: (id) => ({
        url: `/exams/register/${id}`,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      invalidatesTags: ['UserExams'] as any, // Optional, if unregistering should also refetch
    }),

    getUniversities: builder.query<any | ErrorResult, string | undefined>({
      query: () => ({
        url: '/universities',
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.DEFAULT,
    }),

    getUniversity: builder.query<any | ErrorResult, string | undefined>({
      query: (id) => ({
        url: `/universities/${id}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      keepUnusedDataFor: 0,
    }),

    getActiveExamSet: builder.query<any | ErrorResult,  string | undefined>({
      query: (id) => ({
        url: `/exam-set/exam/${id}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        }
      }),
      keepUnusedDataFor: 0,
    }),

  }),
  overrideExisting: true,
});
