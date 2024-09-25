import { ErrorResult } from "../../utils/dataTypes";
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";


export const booksApiSlice = apiSlice.injectEndpoints({
    /* -------------------------------------------------------------------------- */
    /*                 FETCH ALL THE QUESTIONS BASED ON THAT TOPIC                */
    /* -------------------------------------------------------------------------- */
    endpoints: (builder) => ({
     
        getQuestionsByTopic: builder.query<any | ErrorResult, string>({
        query: (param) => ({
          url: `${ENDPOINT.FETCH_PAST_QUESTION(param)}`,
          method: ENDPOINT.HTTP_METHODS.GET,
          headers: {
            Authorization: requestAuthorization(),
          },
        }),
        keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
     
    }),
   /* -------------------------------------------------------------------------- */
    /*                 FETCH ALL THE QUESTIONS BASED ON THAT TOPIC                */
    /* -------------------------------------------------------------------------- */
   
    /* -------------------------------------------------------------------------- */
    /*                          CREATE A NEW CURATED BOOK                         */
    /* -------------------------------------------------------------------------- */
    postQuestionsByTopic: builder.query<any | ErrorResult, string>({
        query: () => ({
            url: `${ENDPOINT.FETCH_NETWORK}`,
            method: ENDPOINT.HTTP_METHODS.POST,
            headers: {
              Authorization: requestAuthorization(),
            },
          }),
          keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
     
    }),
      
  /* -------------------------------------------------------------------------- */
    /*                          CREATE A NEW CURATED BOOK                         */
    /* -------------------------------------------------------------------------- */

    }),
    
    overrideExisting: true,
  });
  
  export const {
   useLazyGetQuestionsByTopicQuery,
   usePostQuestionsByTopicQuery
  } = booksApiSlice;
  