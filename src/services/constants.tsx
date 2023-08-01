// NB: Lifetime is in seconds
export enum CACHE_LIFETIME {
    DEFAULT = 0,
    TINY = 20,
    MEDIUM = 180,
    EXTENDED = 3600,
  }
  
  export enum HTTP_METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
  }

  export const BASE_URL = process.env.REACT_APP_BASE_URL;

  // auth

  export const STUDENT_LOGIN = 'account/signin'
  export const VERIFY_TOKEN = 'account/read'

  // subjects
  export const FETCH_SUBJECTS = 'student/subjects'

  // classmates
  export const FETCH_CLASS_PUPIL = 'student/classmates'