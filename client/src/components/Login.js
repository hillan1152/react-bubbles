import React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';

const FormDiv = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    margin-left: 50%;
`

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    credentials: {
      username:'', 
      password: ''
    }
  };

  changeHandler = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  login = e => {
    e.preventDefault();
    console.log(this.state.credentials)
    axios
      .post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/bubblepage')
      })
      .catch(err => console.log(err.response))
  }
  
  render() {

  return (
    <>
      <FormDiv onSubmit={this.login}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={this.state.credentials.username}
          onChange={this.changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.credentials.password}
          onChange={this.changeHandler}
        />
        <button>Log In</button>
      </FormDiv>
    </>
    );
  }
};

export default Login;
