
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";
import { SubjectResult } from "../../utils/dataTypes/subjects";

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
  }),
  overrideExisting: true,
});

export const {
  useGetSubjectsQuery,
} = subjectApiSlice;