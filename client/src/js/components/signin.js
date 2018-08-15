import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Route, Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'
import { signIn } from '../actions/auth'
import MyAccount from './myaccount'

import '../../css/App.css'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

let createNavButton = function(){
	return <Button color="inherit" component={Link} to="/users">Users</Button>;
}

let createNavRoute = function(){
	return <Route exact path="/users" component={MyAccount} />;
}

class SignIn extends React.Component {
  constructor(props){
  	super(props);

  	this.state = {
    	username: '',
    	password: ''
  	};

  	this.handleInputChange = this.handleInputChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
  	event.preventDefault();
  	signIn(this.state.username, this.state.password).then((success) => {
  		if(success)
  			this.props.showMenu(true);
  	});
  }

  render() {
  	const { classes } = this.props;

  	return(
	  <form className="align-center" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
	  	<div>
		  	<TextField
		  		  name="username"
		          id="username"
		          label="UserName"
		          className={classes.textField}
		          onChange={ this.handleInputChange }
		          margin="normal"
		        />
	    </div>
	    <div>
		    <TextField
		    	  name="password"
		          id="password"
		          label="Password"
		          className={classes.textField}
		          type="password"
		          autoComplete="current-password"
		          margin="normal"
		          onChange = { this.handleInputChange }
		        />    
	    </div>
	    <Button type="submit" variant="contained">Sign In</Button>
	  </form>
	  );
	}
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);