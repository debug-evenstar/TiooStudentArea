
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
  }),
  overrideExisting: true,
});

export const {
  useLazyLoginQuery,
} = authApiSlice;