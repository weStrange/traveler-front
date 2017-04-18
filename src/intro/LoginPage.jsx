
import React from 'react';
import TextField from 'material-ui/TextField';
import img from './bg2.jpg';
import { lightWhite, darkWhite, fullWhite, orange500 } from 'material-ui/styles/colors';
import { Menu, MenuItem } from 'material-ui/Menu';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const BackGround = ({ children, image }) => {
  const childStyle = children.props.style;
  const newStyle = {
    ...childStyle,
    position: 'absolute',
    bottom: '13%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    paddingLeft: 'auto',
    paddingRight: 'auto',
  };
  const newChild = { ...children, props: { ...children.props, style: newStyle } };
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      { newChild }
    </div>
  );
};

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  onChange(e, type) {
    const value: string = e.currentTarget.value;
    if (type === 'username') this.setState({ username: value });
    else this.setState({ password: value });
  }
  render() {
    return (
      <BackGround image={img}>
        <div>
          <TextField
            hintText="Username"
            onChange={e => this.onChange(e, 'username')}
            value={this.state.username}
            fullWidth
            hintStyle={{
              color: darkWhite,
            }}
            inputStyle={{
              color: fullWhite,
            }}
            type='text'
            underlineFocusStyle={{
              borderColor: orange500
            }}
            errorText="Wrong username"
          />
          <br />
          <TextField
            hintText="Password"
            onChange={e => this.onChange(e, 'password')}
            fullWidth
            hintStyle={{
              color: darkWhite,
            }}
            inputStyle={{
              color: fullWhite,
            }}
            type='password'
            underlineFocusStyle={{
              borderColor: orange500,
            }}
            errorText="Wrong password"
          />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '26px' }}>
          <FlatButton
            style={{ color: darkWhite, fontWeight: '200' }}
          >
            <span>Sign up</span>
          </FlatButton>
          <RaisedButton
            label="Log in"
            labelPosition="before"
            icon={<ArrowForward/>}
            backgroundColor={orange500}
          />
          </div>
        </div>
      </BackGround>
    );
  }
}

export default LoginPage;
