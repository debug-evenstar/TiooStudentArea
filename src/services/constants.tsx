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

  export const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
 
  // auth

  export const STUDENT_LOGIN = 'account/signin'
  export const VERIFY_TOKEN = 'account/read'
  export const LEGACY_PASSWORD_RESET = `account/legacy-resetpassword`;

  // subjects
  export const FETCH_SUBJECTS = 'student/subjects'
  export const FETCH_SUBJECT = '/subjects/read'
  export const FETCH_SUBJECT_LESSONS = (id : any) => `subjects/${id}/student/lessons`;

  // lesson
  export const FETCH_LESSON_SLIDES = (id : any) => `lesson/${id}/template`;
  export const FETCH_FREE_SLIDE = `open/lesson/457/template`

  // classmates
  export const FETCH_CLASS_PUPIL = 'student/classteachersandmates'
  export const FETCH_CLASSMATE = 'class/students/'
  export const FETCH_COMING_LESSON = 'lesson/read'

  // library
  export const FETCH_LIBRARY = 'student/library'
  export const FETCH_NETWORK = 'student/network'
  export const FETCH_CHAPTER = '/front/material'
  export const FETCH_LIBRARY_TEXTBOOK = (id : any) => `/front/student/textbook/${id}`