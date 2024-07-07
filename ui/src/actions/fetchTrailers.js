// Action Types
export const FETCH_TRAILERS_REQUEST = 'FETCH_TRAILERS_REQUEST';
export const FETCH_TRAILERS_SUCCESS = 'FETCH_TRAILERS_SUCCESS';
export const FETCH_TRAILERS_FAILURE = 'FETCH_TRAILERS_FAILURE';

// Action Creators
export const fetchTrailersRequest = () => ({
  type: FETCH_TRAILERS_REQUEST
});

export const fetchTrailersSuccess = (trailers) => ({
  type: FETCH_TRAILERS_SUCCESS,
  payload: trailers
});

export const fetchTrailersFailure = (error) => ({
  type: FETCH_TRAILERS_FAILURE,
  payload: error
});
