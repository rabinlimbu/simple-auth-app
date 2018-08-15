import { ADD_USER, UPDATE_USER, UPDATE_PROFILE, ADD_ADDRESS, UPDATE_ADDRESS } from "../constants/action-types";

export const addUser = user => ({ type: ADD_USER, payload: user });
export const updateUser = (user, prop) => ({ type: UPDATE_USER, payload: user, propname: prop });
export const updateProfile = (userProfile, prop) => ({ type: UPDATE_PROFILE, payload: userProfile, propname: prop });
export const addAddress = address => ({ type: ADD_ADDRESS, payload: address });
export const updateAddress = (address, prop, index) => ({ type: UPDATE_ADDRESS, payload: address, propname: prop, index: index });