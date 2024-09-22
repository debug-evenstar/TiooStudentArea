import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";
import { SubjectItem, SubjectResult } from "../../utils/dataTypes/subjects";

export const subjectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubjects: builder.query<SubjectResult | ErrorResult, void>({
            query: () => ({
                url: `${ENDPOINT.FETCH_SUBJECTS}`,
                method: ENDPOINT.HTTP_METHODS.GET,
                headers: {
                    Authorization: requestAuthorization(),
                },
            }),
            keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
        }),
        getSubject: builder.query<SubjectItem | ErrorResult, void>({
            query: (subjectId) => ({
                url: `${ENDPOINT.FETCH_SUBJECT}/${subjectId}`,
                method: ENDPOINT.HTTP_METHODS.GET,
                headers: {
                    Authorization: requestAuthorization(),
                },
            }),
            keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
        }),
        getSubjectLessons: builder.query<any | ErrorResult, void>({
            query: (subjectId) => ({
                url: `${ENDPOINT.FETCH_SUBJECT_LESSONS(subjectId)}`,
                method: ENDPOINT.HTTP_METHODS.GET,
                headers: {
                    Authorization: requestAuthorization(),
                },
            }),
            keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
        }),
        getSubjectsWithTopics: builder.query<any | ErrorResult, void>({
            query: () => ({
                url: `/open/subjects/topics`,
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

export const { useGetSubjectsQuery, useLazyGetSubjectsWithTopicsQuery, useLazyGetSubjectQuery, useLazyGetSubjectLessonsQuery } = subjectApiSlice;
