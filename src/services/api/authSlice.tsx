
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { StudentLoginInput, StudentLoginResult } from "../../utils/dataTypes/auth";
import { ErrorResult } from "../../utils/dataTypes";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<StudentLoginResult | ErrorResult, StudentLoginInput>({
      query: (login) => ({
        url: `${ENDPOINT.STUDENT_LOGIN}`,
        method: ENDPOINT.HTTP_METHODS.POST,
        body: login,
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.DEFAULT,
    }),

    verifyToken: builder.query<any | ErrorResult, string>({
      query: (token) => ({
        url: `${ENDPOINT.VERIFY_TOKEN}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyLoginQuery,
  useLazyVerifyTokenQuery
} = authApiSlice;