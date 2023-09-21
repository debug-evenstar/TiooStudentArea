import { ErrorResult } from "../../utils/dataTypes";
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";

export const libraryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLibrary: builder.query<any | ErrorResult, void>({
            query: () => ({
                url: `${ENDPOINT.FETCH_LIBRARY}`,
                method: ENDPOINT.HTTP_METHODS.GET,
                headers: {
                    Authorization: requestAuthorization(),
                },
            }),
            keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
        }),
        getNetwork: builder.query<any | ErrorResult, void>({
            query: (subjectId) => ({
                url: `${ENDPOINT.FETCH_NETWORK}`,
                method: ENDPOINT.HTTP_METHODS.GET,
                headers: {
                    Authorization: requestAuthorization(),
                },
            }),
            keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
        }),
        // getSubjectLessons: builder.query<any | ErrorResult, void>({
        //     query: (subjectId) => ({
        //         url: `${ENDPOINT.FETCH_SUBJECT_LESSONS(subjectId)}`,
        //         method: ENDPOINT.HTTP_METHODS.GET,
        //         headers: {
        //             Authorization: requestAuthorization(),
        //         },
        //     }),
        //     keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
        // }),
    }),
    overrideExisting: true,
});

export const { useGetLibraryQuery, useGetNetworkQuery  } = libraryApiSlice;
