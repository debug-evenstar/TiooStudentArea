
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { StudentLoginInput, StudentLoginResult } from "../../utils/dataTypes/auth";
import { ErrorResult } from "../../utils/dataTypes";

export const routineApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClass: builder.query<StudentLoginResult | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.FETCH_CLASS_PUPIL}`,
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

export const {
  useGetClassQuery
} = routineApiSlice;