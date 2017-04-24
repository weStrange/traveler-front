 /* @flow */

import React from 'react'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'
import RadioGroup from './RadioGroup'
import { red500, green500 } from 'material-ui/styles/colors'

const _getErrorStyle = (isError) => {
	if (isError === undefined) return undefined
	return {
    	color: (isError) ? red500 : green500
  	}
}
const _getErrorMessage = (isError) => {
	if (isError === undefined) return undefined
	if (isError) return 'Password Mismatched'
	return 'Password matched'
}

class Signup extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			autocompleteCountry: ['Finland', 'Russia', 'Vietnam'],
			autocompleteCity: ['Helsinki', 'Saigon', 'Ha Noi', 'Moscow', 'Saint Petersburg', 'Stockholm', 'Vaasa'],
			name: "",
			username: "",
			password: "",
			country: "",
			city: "",
			dob: moment(),
			confirmpassword: ""
		}
	}
	handleChange(value, stateKey) {
		const updater = (prev, props) => {
			return { [stateKey]: value }
		}
		this.setState(updater)
	}
	passwordChecker() {
		const updater = (prev, props) => {
			return {passwordMismatch: prev.confirmpassword !== prev.password}
		}
		this.setState(updater, this.forceUpdate)
	}
	_removeMismatchedPasswordWarning() {
		const updater = (prev, props) => {
			return {passwordMismatch: undefined}
		}
		this.setState(updater, this.forceUpdate)
	}
	render() {
		return (
			<div>
				<TextField
					hintText="Name"
					value={this.state.name}
					onChange={(e, value)=> this.handleChange(value, 'name')}
				/>  <br/>
				<TextField
					hintText="Username"
					value={this.state.username}
					onChange={(e, value)=> this.handleChange(value, 'username')}
				/> <br/>
				<TextField
					type="email"
					hintText="Email"
					onChange={(e, value)=> this.handleChange(value, 'email')}
				/> <br/>
				<DatePicker //might be broken due to the complexity of moment()
					hintText="Date of Birth"
					mode="landscape"
					value={this.state.dob}
					onChange={(undefined, date)=> this.handleChange(date, 'dob')}
				/> <br/>
				<RadioGroup
					onChange={(value) => this.handleChange(value, 'gender')}
					options={[
						{
							label: 'Male',
							value: 'male'
						},
						{
							label: 'Female',
							value: 'female'
						}
					]}
					title="Gender"
					name="gender"
				/> <br/>
				<AutoComplete
					disableFocusRipple
					onUpdateInput={(seachText) => this.handleChange(seachText, 'country')}
					hintText="Home country"
					dataSource={this.state.autocompleteCountry}
				/> <br/>
				<AutoComplete
					hintText="Home city"
					onUpdateInput={(seachText) => this.handleChange(seachText, 'city')}
					dataSource={this.state.autocompleteCity}
				/> <br/>
				<TextField
					errorText={_getErrorMessage(this.state.passwordMismatch)}
					errorStyle={_getErrorStyle(this.state.passwordMismatch)}
					type="Password"
					hintText="Password"
					floatingLabelText="Password"
					floatingLabelStyle={_getErrorStyle(this.state.passwordMismatch)}
					onChange={(e, value)=> {
						this.handleChange(value, 'password')
						this._removeMismatchedPasswordWarning()
						}
					}
				/> <br/>
				<TextField
					errorText={_getErrorMessage(this.state.passwordMismatch)}
					errorStyle={_getErrorStyle(this.state.passwordMismatch)}
					type="Password"
					hintText="Confirm password"
					floatingLabelText="Confirm password"
					floatingLabelStyle={_getErrorStyle(this.state.passwordMismatch)}
					onChange={(e, value)=> {
						this.handleChange(value, 'confirmpassword')
						this._removeMismatchedPasswordWarning()
						}
					}
					onBlur={()=> {
						this.passwordChecker()
						}
					}
				/>
			</div>
		)
	}
}
export default Signup