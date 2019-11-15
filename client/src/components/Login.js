import React, { useState } from "react";


// Components
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialState = {
  username: '',
  password: undefined
}


const Login = (props) => {
  const [input, setInput] = useState(initialState)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = (e) => {
    e.preventDefault();
    axiosWithAuth().post('/api/login', { username: 'Lambda', password: '1234' })
      .then(res => {
        console.log('Login Res', res.data.payload)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubblepage')
      })
      .catch(err => console.log("Login Error", err.response))
  }

  const handleChanges = e => {
    setInput({...input, [e.target.name]:e.target.value})
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChanges}
            value={input.username}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChanges}
            value={input.password}
          />
          <button>Login</button>
      </form>
    </>
  );
};

export default Login;
