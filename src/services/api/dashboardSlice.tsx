import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result?.map(({ id }: any) => ({ type: "Books", id } as const)),
              { type: "Books", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Books', id: 'LIST' }` is invalidated
            [{ type: "Books", id: "LIST" }],

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
    }),

    addToStudentShelf: builder.mutation<any | ErrorResult, any>({
      query: (payload) => ({
        url: `/front/student/shelf/add-book`,
        method: ENDPOINT.HTTP_METHODS.POST,
        body: payload,
        headers: {
          Authorization: requestAuthorization(),
        },
        invalidatesTags: [{ type: "Books", id: "LIST" }],
      }),
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
    }),
  }),
  overrideExisting: true,
});
