export const apiUrl =
  process.env.NODE_DEV !== 'production'
    ? 'http://localhost:5000/api'
    : 'https://damp-beyond-91391.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';

export const POST_LOADED_SUCCESS = 'POST_LOAD_SUCCESS';
export const POST_LOADED_FAIL = 'POST_LOAD_FAIL';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const FIND_POST = 'FIND_POST';
