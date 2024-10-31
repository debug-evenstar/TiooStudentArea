
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { ErrorResult } from "../../utils/dataTypes";

export const studyPlanSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setTargetScore: builder.mutation<any | ErrorResult, any>({
      query: (payload) => ({
        url: `${ENDPOINT.STUDY_PLAN_TARGET_SCORE}`,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
            Authorization: requestAuthorization(),
          },
          body: payload
      }),
    }),
    saveStudyPlan: builder.mutation<any | ErrorResult, any>({
      query: (payload) => ({
        url: `${ENDPOINT.STUDY_PLAN}`,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
            Authorization: requestAuthorization(),
          },
          body: payload
      }),
    }),

  }),
  overrideExisting: true,
});

export const {
  useSetTargetScoreMutation,
  useSaveStudyPlanMutation
} = studyPlanSlice;