import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography, AppBar, Toolbar, Button, Menu, MenuItem, IconButton } from '@material-ui/core'
import { MenuIcon, AccountCircle } from '@material-ui/icons'
import MyAccount from './components/myaccount'
import MyAddress from './components/myaddress'
import SignIn from './components/signin'
import { isSignedIn, signOut } from './actions/auth'
import SignOut from './components/signout'
import { Register } from './components/register'
import Home from './components/home'

import '../css/App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

let classes;

class App extends Component {
  constructor() {
    super();
    this.state = {
      showAuthenticatedMenu : false,
      anchorEl: null
    }

    isSignedIn().then((res) => {
      this.setState({
        showAuthenticatedMenu: res
      });
    });

    this.handleAuthenticatedMenus = this.handleAuthenticatedMenus.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAuthenticatedMenus(value){
    this.setState({
      showAuthenticatedMenu: true
    });
  }

  handleSignOut(value){
    signOut().then((res) => {
      this.setState({
        showAuthenticatedMenu: false
      });
    })
  }

  render(){
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <div className={classes.root}>
          <AppBar id="appBar" ref="appBar" style={{ margin: 0 }} position='fixed'>
            <Toolbar id="toolbar" ref="toolbar">
              <Typography variant="title" color="inherit" className={classes.flex}>
              </Typography>
              {
                this.state.showAuthenticatedMenu ?
                  <Button color="inherit" onClick={this.handleSignOut}>Sign Out</Button>
                  :
                  <div>
                  <Redirect to="/signin"/>
                  <Button color="inherit" component={Link} to="/signin">Sign In</Button>
                  <Button color="inherit" component={Link} to="/register">Register</Button>
                  </div>
              }
              {
                this.state.showAuthenticatedMenu && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                  <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem><Button color="inherit" component={Link} to="/myaccount">My Account</Button></MenuItem>
                    <MenuItem><Button color="inherit" component={Link} to="/myaddress">My Address</Button></MenuItem>
                  </Menu>
                  <Redirect to="/myaccount"/>
                </div>
            )}
            </Toolbar>
          </AppBar>
          <main id="route" className="main-content-container">
            <Route exact path="/signin" render={(props) => (
              <SignIn {...props} showMenu={this.handleAuthenticatedMenus}/>
            )} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/myaccount" component={MyAccount}/>
            <Route exact path="/myaddress" component={MyAddress}/>
          </main>
        </div>
    )
  }
}

export default withStyles(styles)(App);