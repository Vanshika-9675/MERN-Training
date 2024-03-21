import React, { useReducer } from 'react';
import './SignUp.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const initialState = {
  action: "Sign Up",
  userName: '',
  email: '',
  password: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'setAction':
      return { ...state, action: action.payload };
    case 'setUsername':
      return { ...state, userName: action.payload };
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    default:
      throw new Error('Invalid action');
  }
}

function SignUp() {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigation = useNavigate();

  const handleAction = () => {
    if (state.action === "Sign Up") {
      dispatch({ type: 'setAction', payload: "Log In" });
    } else {
      dispatch({ type: 'setAction', payload: "Sign Up" });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = '';
      let body = {};
      if (state.action === 'Sign Up') {
        url = 'http://localhost:3000/api/v1/signup';
        body = { userName: state.userName, email: state.email, password: state.password };
      } else {
        url = 'http://localhost:3000/api/v1/login';
        body = { email: state.email, password: state.password };
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`${state.action} successful`);
        localStorage.setItem('token', data.token)
        navigation('/home')
      } else {
        alert(`${state.action} failed`);
        console.error(`${state.action} failed`);
      }
    } catch (error) {
      alert(`Error during ${state.action}: ${error}`);
      console.error(`Error during ${state.action}: ${error}`);
    }
  };

  return (
    <div className="wrapper">
      <form action="">
        <h1>{state.action}</h1>

        <div className={state.action === "Sign Up" ? "input-box" : "not-active"}>
          <input
            type="text"
            placeholder='userName'
            required
            value={state.userName}
            onChange={(e) => dispatch({ type: 'setUsername', payload: e.target.value })}
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder='Email'
            required
            value={state.email}
            onChange={(e) => dispatch({ type: 'setEmail', payload: e.target.value })}
          />
          <MdEmail className='icon' />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder='Password'
            required
            value={state.password}
            onChange={(e) => dispatch({ type: 'setPassword', payload: e.target.value })}
          />
          <FaLock className='icon' />
        </div>
        <button type="submit" onClick={handleSubmit}>{state.action}</button>
        <div className='register-link'>
          <p>{state.action === "Sign Up" ? "Already have" : "Create"} an account? <button type="button" onClick={handleAction}>{state.action === "Sign Up" ? "Log In" : "Sign Up"}</button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
