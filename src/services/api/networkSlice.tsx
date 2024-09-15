
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";

export const networkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReferrals: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.FETCH_USER_REFERRALS}`,
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
  useGetReferralsQuery,

} = networkApiSlice;