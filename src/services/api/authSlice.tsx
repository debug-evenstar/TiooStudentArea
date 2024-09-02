
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { StudentLoginInput, StudentLoginResult } from "../../utils/dataTypes/auth";
import { ErrorResult } from "../../utils/dataTypes";
import { requestAuthorization } from "../helpers";

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
    legacyResetPassword: builder.mutation<any, any>({
      query: (payload) => ({
        url: `${ENDPOINT.LEGACY_PASSWORD_RESET}`,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
          Authorization: requestAuthorization(),
        },
        body: payload,
      })
    })
  }),
  overrideExisting: true,
});

export const {
  useLazyLoginQuery,
  useLazyVerifyTokenQuery,
  useLegacyResetPasswordMutation,
} = authApiSlice;