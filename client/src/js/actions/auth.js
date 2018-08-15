import { doGet, doPost } from './api'

export const signIn = (username, password) => {
  return doPost('/api/signin', {'username': username, 'password': password}).then((res) => {
	return res;
  });
}

export const signOut = () => {
  return doGet('/api/signout').then((res) => {
	return res;
  });
}

export const isSignedIn = () => {
  return doGet('/api/issignedin').then((res) => {
  		return res;
  	});
}