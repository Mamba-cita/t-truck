import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import globalReducer from '../features/theme/index';
import customerReducer from '../features/customers/customerSlice';
import moveReducer from '../features/transport/moveSlice';
import truckReducer from '../features/assets/tucks/truckSlice';
import trailerReducer from '../features/assets/trailers/trailerSlice';
import driverReducer from '../features/assets/drivers/driverSlice';
import orderReducer from '../features/orders/orderSlice';
import searchReducer from '../features/search/searchSlice';
import reportsReducer from '../features/report/reportSlice';
import fuelReducer from '../features/fuel/fuelSlice';

// Function to save Redux state to local storage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

// Function to load Redux state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Return undefined if no state is found in local storage
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  customers: customerReducer,
  moves: moveReducer,
  trucks: truckReducer,
  trailers: trailerReducer,
  drivers: driverReducer,
  orders: orderReducer,
  search: searchReducer,
  reports: reportsReducer,
  fuel: fuelReducer,
  // Add other reducers here if you have them
});

// Load initial state from local storage
const preloadedState = loadStateFromLocalStorage();

// Create Redux store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
});

// Subscribe to store changes and save state to local storage
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});
