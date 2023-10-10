import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";

export const lessonApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLessonSlides: builder.query<any | ErrorResult, void>({
            query: (id) => ({
                url: `${ENDPOINT.FETCH_LESSON_SLIDES(id)}`,
                method: ENDPOINT.HTTP_METHODS.GET,
                headers: {
                    Authorization: requestAuthorization(),
                },
            }),
            keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
        }),

        getFreeSlides: builder.query<any | ErrorResult, void>({
            query: () => ({
                url: `${ENDPOINT.FETCH_FREE_SLIDE}`,
                method: ENDPOINT.HTTP_METHODS.GET,
            }),
            keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
        })
    }),
    overrideExisting: true,
});

export const { useLazyGetLessonSlidesQuery, useGetFreeSlidesQuery } = lessonApiSlice;
