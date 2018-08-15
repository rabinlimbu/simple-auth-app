import { combineReducers } from 'redux';
import { userStore, addressStore } from './users';

export default combineReducers({
    userStore,
    addressStore
});