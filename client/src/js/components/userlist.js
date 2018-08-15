import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { users: state.users };
};

const UserList = ({ users }) => (
  <ul className="list-group list-group-flush">
    {users.map(el => (
      <li className="list-group-item" key={el.id}>
        Username: {el.username} and email: {el.email}
      </li>
    ))}
  </ul>
);

//connects a part of the Redux state to the props of a React component
export const List = connect(mapStateToProps)(UserList);
