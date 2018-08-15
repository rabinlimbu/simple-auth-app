import React, { Component } from 'react';
import { connect } from "react-redux";
import { List } from './userlist';
import { fetchUser, saveUser, updateUserStore, updateUserProfileStore } from '../actions/users';
import { addUser } from "../actions/index";
import { TextField, Button, withStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import logo from '../../css/logo.svg';
import classNames from 'classnames';
import '../../css/App.css';
import '../../css/custom-material-ui.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const mapStateToProps = state => {
  return { 
    getUser: state.userStore.user 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser : () => dispatch(fetchUser()),
    updateUser: (item, name, isProfile) => dispatch(updateUserStore(item, name, isProfile))
  };
};

class MyAccount extends Component {
  state = {
    user: ''
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.updateUser(name, event.target.value);
  };

  handleProfileChange = name => event => {
    this.updateUser(name, event.target.value, true);
  };

  handleSubmit(event) {
    saveUser(this.props.getUser);
    event.preventDefault();
  };

  updateUser = function(name, value, isProfile) {
    if(!isProfile)
      this.props.getUser[name] = value
    else {
      if(this.props.getUser.profile == null){
        this.props.getUser.profile = {};
        this.props.getUser.profile['id'] = this.props.getUser.id;
        this.props.getUser.profile['user'] = this.props.getUser.id;
      }
      this.props.getUser.profile[name] = value
    }

    this.props.updateUser(this.props.getUser, name, isProfile);
  };

  componentDidMount() {
    this.props.addUser();
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="form-container align-middle align-center">
        <header>
          <h1 className="app-title">User Details</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="firstName"
              label="First Name"
              fullWidth
              value={this.props.getUser?this.props.getUser.first_name:""}
              onChange={this.handleChange('first_name')}
              margin="normal"
            />
            <br/>
            <TextField
              id="email"
              label="Email"
              fullWidth
              defaultValue=""
              value={this.props.getUser?this.props.getUser.email:""}
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <br />
            <TextField
              id="dateJoined"
              label="Date Joined"
              fullWidth="true"
              value={this.props.getUser?this.props.getUser.date_joined:""}
              margin="normal"
            />
            <header>
              <h1 className="app-title">Profile</h1>
            </header>
            <TextField
              id="bio"
              label="My Bio"
              fullWidth="true"
              multiline="true"
              value={this.props.getUser && this.props.getUser.profile?this.props.getUser.profile.bio:""}
              onChange={this.handleProfileChange('bio')}
              margin="normal"
            />
            <br/>
            <TextField
              id="birthDate"
              label="Birth Date"
              fullWidth="true"
              value={this.props.getUser && this.props.getUser.profile?this.props.getUser.profile.birth_date:""}
              onChange={this.handleProfileChange('birth_date')}
              margin="normal"
            />
            <br />
            <TextField
              id="location"
              label="Location"
              fullWidth="true"
              value={this.props.getUser && this.props.getUser.profile?this.props.getUser.profile.location:""}
              onChange={this.handleProfileChange('location')}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" size="small" className={classes.button}>
              <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Save
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

//mapDispatchToProps connects Redux actions to React props
MyAccount = withStyles(styles)(MyAccount);
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);