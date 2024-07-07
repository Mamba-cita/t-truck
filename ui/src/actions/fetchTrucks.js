// Action Types
export const FETCH_TRUCKS_REQUEST = 'FETCH_TRUCKS_REQUEST';
export const FETCH_TRUCKS_SUCCESS = 'FETCH_TRUCKS_SUCCESS';
export const FETCH_TRUCKS_FAILURE = 'FETCH_TRUCKS_FAILURE';

// Action Creators
export const fetchTrucksRequest = () => ({
  type: FETCH_TRUCKS_REQUEST
});

export const fetchTrucksSuccess = (trucks) => ({
  type: FETCH_TRUCKS_SUCCESS,
  payload: trucks
});

export const fetchTrucksFailure = (error) => ({
  type: FETCH_TRUCKS_FAILURE,
  payload: error
});
