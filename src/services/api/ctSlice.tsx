
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { StudentLoginInput, StudentLoginResult } from "../../utils/dataTypes/auth";
import { ErrorResult } from "../../utils/dataTypes";
import { requestAuthorization } from "../helpers";

export const ctApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    saveProfile: builder.mutation<any | ErrorResult, string>({
      query: (payload) => ({
        url: `ct/profile`,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
          Authorization: requestAuthorization(),
        }
        ,body: payload
      }),
    }),

    getProfile: builder.query<any, any>({
      query: () => ({
        url: `ct/profile`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: requestAuthorization(),
        },
      })
    })
  }),
  overrideExisting: true,
});
