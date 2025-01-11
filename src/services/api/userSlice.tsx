import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInformation: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: `/student/personalinfo`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
      providesTags: ['UserInfo'] as any
    }),

    updateUserProfile: builder.mutation<any | ErrorResult, any>({
      query: (payload) => ({
        url: "/student/updateinfo",
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
          Authorization: requestAuthorization(),
        },
        body: payload,
      }),
      invalidatesTags: ['UserInfo'] as any
    }),
  }),
  overrideExisting: true,
});
