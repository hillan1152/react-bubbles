import React, { useState, useEffect } from "react";
import { axiosAuth } from '../utils/axiosAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  let [info, setInfo] = useState({
    username:'', 
    password: ''
  })

  useEffect({
    setInfo
  }, [])

  let changeHandler = () => {
    
  }

  let login = e => {
    e.preventDefault();
    axiosAuth()
      .post('/api/login', info)
      .then(res => console.log(res))
      .catch(err => console.log(err.response))
  }
  

  return (
    <>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={info.username}
          handleChanges={changeHandler}
        />
      </form>
    </>
  );
};

export default Login;
