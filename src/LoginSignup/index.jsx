import React, { use, useEffect, useRef } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import './style.css'


const LoginSignup = () => {
  const signUpBox = useRef(null);
  const logInBox = useRef(null);
  const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const Navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      Navigate('/');
    }
  }, []);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleSignUp = () => {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (username === '' || email === '' || password === '') {
      toast.error('Please fill all fields');
      return;
    }
    if (accounts.some(acc => acc.email === email)) {
      toast.error('Account with this email already exists');
      return;
    }
    const userData = { username, email, password, id: Date.now(), tasks: [] };
    accounts.push(userData);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    console.log(JSON.parse(localStorage.getItem('accounts')));
    usernameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';

    signUpBox.current.style.display = 'none';
    logInBox.current.style.display = 'block';
    alert('Account created successfully! Please log in.');
  }

  const liEmailRef = useRef(null);
  const liPasswordRef = useRef(null);

  const handleLogIn = () => {
    const email = liEmailRef.current.value;
    const password = liPasswordRef.current.value;
    if (email === '' || password === '') {
      toast.error('Please fill all fields');
      return;
    }

    if (!accounts.some(acc => acc.email === email)) {
      toast.error('No account found with this email');
      return;
    }

    const account = accounts.find(acc => acc.email === email && acc.password === password);


    if (account) {
      localStorage.setItem('loggedInUser', JSON.stringify(account));
      toast.success('Login successful');
      Navigate('/');
    } else {
      toast.error('Invalid email or password');
    }
  }

  return (
    <>
      <span className='container'>
        <span className='signUp' ref={signUpBox}>
          <h2>Sign Up</h2>
          <input type="text" placeholder='Username' ref={usernameRef} />
          <input type="email" placeholder='Email' ref={emailRef} />
          <input type="password" placeholder='Password' ref={passwordRef} />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={() => {
            signUpBox.current.style.display = 'none';
            logInBox.current.style.display = 'block';
          }}>Already have an account? Log In</button>
        </span>
        <span className='logIn' ref={logInBox}>
          <h2>Log In</h2>
          <input type="email" placeholder='Email' ref={liEmailRef} />
          <input type="password" placeholder='Password' ref={liPasswordRef} />
          <button onClick={handleLogIn}>Log In</button>
          <button onClick={() => {
            logInBox.current.style.display = 'none';
            signUpBox.current.style.display = 'block';
          }}>Dont have an account? Sign Up</button>
        </span>
      </span>
    </>
  )
}

export default LoginSignup;
