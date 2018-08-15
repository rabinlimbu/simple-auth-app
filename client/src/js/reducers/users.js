import { ADD_USER, 
	UPDATE_USER, 
	UPDATE_PROFILE, ADD_ADDRESS, UPDATE_ADDRESS } from "../constants/action-types";

const initialState = {
  user: '',
  address: []
};

export const userStore = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.payload };
    case UPDATE_USER:
      return { ...state, user: {
      	...state.user,
      	[action.propname]: action.payload[action.propname] 
      }
      };
    case UPDATE_PROFILE:
      return { ...state, user: {
      	...state.user,
      	profile: {
      		...state.user.profile,
      		[action.propname]: action.payload.profile[action.propname]
      	}
      }
      };
    default:
      return state;
  }
};

export const addressStore = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ADDRESS:
			return { ...state, address: action.payload };
		case UPDATE_ADDRESS: 
			return {
				...state,
				address: state.address.map(item => item.id === action.payload.id ?
            	{ ...item, [action.propname]: action.payload[action.propname] } : item)
			}
		default:
			return state;
	}
};
