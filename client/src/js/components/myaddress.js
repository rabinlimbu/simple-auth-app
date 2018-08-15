import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchAddress, saveAddress, updateAddressStore } from '../actions/users';
import { addAddress } from "../actions/index";
import { TextField, Button, withStyles, CircularProgress, Fade } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
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
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  placeholder: {
    height: 40,
  },
});

const mapStateToProps = state => {
  return { 
    getAddress: state.addressStore.address
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeAddress : (addressList) => dispatch(addAddress(addressList)),
    updateAddress: (item, name, index) => dispatch(updateAddressStore(item, name, index))
  };
};

const RenderNewAddress = props => {
	return (
		<form onSubmit={props.onSubmit}>
				<h2>New Address {props.addressNum}</h2>
			    		<TextField
			    		  id="address1"
			              name="address1"
			              label="Address Line 1"
			              fullWidth
			              defaultValue = ""
			              value = {props.newAddress?props.newAddress.address1:""}
			              onChange= {props.onChange}
			              margin="normal"
			            />
			            <br/>
			            <TextField
			              id="address2"
			              name="address2"
			              label="Address Line 2"
			              fullWidth
			              defaultValue = ""
			              value = {props.newAddress?props.newAddress.address1:""}
			              onChange= {props.onChange}
			              margin="normal"
			            />
			            <br/>
			            <TextField
			              id="city"
			              name="city"
			              label="City"
			              fullWidth
			              defaultValue = ""
			              onChange= {props.onChange}
			              margin="normal"
			            />
			            <br/>
			          	<TextField
			          	  id="state"
			              name="state"
			              label="State"
			              fullWidth
			              defaultValue = ""
			              onChange= {props.onChange}
			              margin="normal"
			            />
			            <br/>
			          	<TextField
			          	  id="postal_code"
			              name="postal_code"
			              label="postal_code"
			              fullWidth
			              defaultValue = ""
			              onChange= {props.onChange}
			              margin="normal"
			            />
			            <br/>
			          	<TextField
			          	  id="country"
			              name="country"
			              label="country"
			              fullWidth
			              defaultValue = ""
			              onChange= {props.onChange}
			              margin="normal"
			            />
			            <Button type="submit" variant="contained" color="primary" size="small" className={props.classes.button}>
			              <SaveIcon className={classNames(props.classes.leftIcon, props.classes.iconSmall)} />
			                Save
			            </Button>
			    	</form>
		)
}

const AddNewAddressButton = props => {
	return (
		<Button variant="contained" color="primary" className={props.classes.button}>
        	Add New Address
      	</Button>
	);
}

class MyAddress extends Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			newAddress : {},
			loading: true,
			saving: false
		};
	}

	handleChange = () => event => {
		if(event.target.getAttribute('addressId') !== null)
			this.updateAddress(event.target.getAttribute('addressId'), event.target.name, event.target.value);
		else
			this.state.newAddress[event.target.name] = event.target.value;
	};

	handleSubmit(event) {
		let addressId = event.target.dataset.addressId;
		if(addressId) {
			this.props.getAddress.map((address, index) => {
				if(address.id === parseInt(addressId, 10)){
					this.saveAddressDelegate(address, false);
	    		}
			})
		} else {
			this.saveAddressDelegate(this.state.newAddress, true);
		}
		event.preventDefault();
	};

	updateAddress = function(addressId, name, value) {
		this.props.getAddress.map((address, index) => {
			if(address.id === parseInt(addressId, 10)) {
				address[name] = value;
	    		this.props.updateAddress(address, name, index);
    		}
		})
  	};

  	saveAddressDelegate = (address, isNew) => {
  		this.state.saving = true;
  		saveAddress(address, isNew);
  		this.state.saving = false;
  	}

	componentDidMount() {
		this.state.loading = true;
    	fetchAddress().then((res) => {
    		this.state.loading = false;
    		this.props.storeAddress(res);
    	});
  	}

	render() {
		const { saving, loading } = this.state;
		const { classes } = this.props;
		return(
			<div className="form-container align-middle align-center">
		    	<h1>My Address</h1>
		    		{
		    			loading &&
			    		<div className={classes.placeholder}>
				    		<Fade
				              in={loading}
				              style={{
				                transitionDelay: loading ? '800ms' : '0ms',
				              }}
				              unmountOnExit
				            >
				            	<CircularProgress />
				            </Fade>
			            </div>
		        	}
		    		{
		    		this.props.getAddress.length > 0 ?
		    		this.props.getAddress.map((address, index) =>
		    		<div>
				    	<form onSubmit={this.handleSubmit} data-address-id={address.id}>
				    		<h2>Address {index+1} </h2>
				    		<TextField
				    		  InputProps={ {inputProps : {addressId: address.id} } }
				              id="address1"
				              name="address1"
				              label="Address Line 1"
				              fullWidth
				              value={address?address.address1:""}
				              onChange={this.handleChange()}
				              margin="normal"
				            />
				            <br/>
				            <TextField
				              InputProps={ {inputProps : {addressId: address.id} } }
				              id="address2"
				              name="address2"
				              label="Address Line 2"
				              fullWidth
				              value={address?address.address2:""}
				              onChange={this.handleChange()}
				              margin="normal"
				            />
				            <br/>
				            <TextField
				              InputProps={ {inputProps : {addressId: address.id} } }
				              id="city"
				              name="city"
				              label="City"
				              fullWidth
				              value={address?address.city:""}
				              onChange={this.handleChange()}
				              margin="normal"
				            />
				            <br/>
				          	<TextField
				          	  InputProps={ {inputProps : {addressId: address.id} } } 
				              id="state"
				              name="state"
				              label="State"
				              fullWidth
				              value={address?address.state:""}
				              onChange={this.handleChange()}
				              margin="normal"
				            />
				            <br/>
				          	<TextField
				          	  InputProps={ {inputProps : {addressId: address.id} } }
				              id="postal_code"
				              name="postal_code"
				              label="postal_code"
				              fullWidth
				              value={address?address.postal_code:""}
				              onChange={this.handleChange()}
				              margin="normal"
				            />
				            <br/>
				          	<TextField
				          	  InputProps={ {inputProps : {addressId: address.id} } }
				              id="country"
				              name="country"
				              label="country"
				              fullWidth
				              value={address?address.country:""}
				              onChange={this.handleChange()}
				              margin="normal"
				            />
				            <Button type="submit" disabled={saving} variant="contained" color="primary" size="small" className={classes.button}>
				              <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
				                Save
				            </Button>
				          	{saving && <CircularProgress size={24} className={classes.buttonProgress} />}
				    	</form>
			    		{
			    		this.props.getAddress.length === 1 && 
			            	<RenderNewAddress classes={classes} onSubmit={this.handleSubmit} addressNum={2} newAddress={this.state.newAddress} onChange={this.handleChange()}/>	
			        	}
			        </div>
			    	):
			    	<div>
				    	<RenderNewAddress classes={classes} onSubmit={this.handleSubmit} addressNum={1} newAddress={this.state.newAddress} onChange={this.handleChange()}/>
			    	</div>
			    }
		  	</div>
	  	)
	}
}

MyAddress = withStyles(styles)(MyAddress);
export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);