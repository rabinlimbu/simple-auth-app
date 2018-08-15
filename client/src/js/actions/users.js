import { addUser, updateUser, updateProfile, addAddress, updateAddress } from './index'

export const fetchUser = () => {
  var self = this;
  return (dispatch) => {
  	self.get('/api/user', "GET").then((res) => {
  		dispatch(addUser(res));
  	});
  }
}

export const saveUser = (user) => {
  var self = this;
  self.putpost('/api/user', "PUT", user).then((res) => {
	return res;
  });
}


export const updateUserStore = (user, propname, isProfile) => {
  return (dispatch) => {
	if(isProfile)
	  dispatch(updateProfile(user, propname));
	else
	  dispatch(updateUser(user, propname));	
  }
}

export const updateUserProfileStore = (user, propname) => {
  return (dispatch) => {
  	dispatch(updateProfile(user, propname));
  }
}

export const fetchAddress = () => {
  	var self = this;
  	return self.get('/api/address', "GET").then((res) => {
  		return res;
  	});
};

export const saveAddress = (address, isNew) => {
  var self = this;
  let requestType = '', endPoint = '';

  if(!isNew) {
  	requestType = 'PUT';
  	endPoint = '/api/address/' + address.id;
  }
  else {
  	requestType = 'POST';
  	endPoint = '/api/address';
  }

  self.putpost(endPoint, requestType, address).then((res) => {
	return res;
  });
}

export const updateAddressStore = (address, propname, index) => {
  return (dispatch) => {
  	dispatch(updateAddress(address, propname, index));
  }
}

export const signIn = (username, password) => {
  var self = this;
  return self.putpost('/api/signin', "POST", {'username': username, 'password': password}).then((res) => {
	return res;
  });
}

export const isSignedIn = () => {
  var self = this;
  return self.get('/api/issignedin', "GET").then((res) => {
  		return res;
  	});
}

this.get = async (path, method) => {
	const response = await fetch(path, {
  		method: method
  	});
	const data = await response.json();

	if (response.status !== 200) throw Error(data.message);

	return data;
};

this.putpost = async (path, method, req) => {
	const response = await fetch(path, {
  		method: method, // or 'PUT'
  		body: JSON.stringify(req),
  		headers:{
    		'Content-Type': 'application/json'
  		}
  	});
	const data = await response.json();

	if (response.status !== 200) throw Error(data.message);

	return data;
};