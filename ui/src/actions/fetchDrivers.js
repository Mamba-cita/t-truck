// Action Types
export const FETCH_DRIVERS_REQUEST = 'FETCH_DRIVERS_REQUEST';
export const FETCH_DRIVERS_SUCCESS = 'FETCH_DRIVERS_SUCCESS';
export const FETCH_DRIVERS_FAILURE = 'FETCH_DRIVERS_FAILURE';

// Action Creators
export const fetchDriversRequest = () => ({
  type: FETCH_DRIVERS_REQUEST
});

export const fetchDriversSuccess = (drivers) => ({
  type: FETCH_DRIVERS_SUCCESS,
  payload: drivers
});

export const fetchDriversFailure = (error) => ({
  type: FETCH_DRIVERS_FAILURE,
  payload: error
});
