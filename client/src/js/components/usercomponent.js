import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from './actions/users';
import { addUser } from "./actions/index";


const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};

class UserComponent extends Component {
	componentDidMount() {
		var userList = fetchUsers();
		userList.then(u => 
			this.props.addUser(u));
	}

	render(){
		return (" ");
	}
}

const Users = connect(null, mapDispatchToProps)(UserComponent);

export default UserComponent;