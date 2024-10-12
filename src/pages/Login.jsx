import React, { useState } from 'react'
import triangle from "../assets/triangle.svg"
import square from "../assets/square.svg"
import circle from "../assets/circle.svg"
import google from "../assets/google.png"
import github from "../assets/github.png"
import facebook from "../assets/facebook.png"
import "./Login.scss"

function Login() {
    const Options = {
        LOGIN: 'login',
        SIGNUP: 'signup',
        FORGOT: 'forgot',
    };
    const [option, setOption] = useState(Options.LOGIN);
    const renderHeading = () => {
        switch (option) {
          case Options.LOGIN:
            return <h1>Login</h1>;
          case Options.SIGNUP:
            return <h1>Signup</h1>;
          case Options.FORGOT:
            return <h1>Forgot Password?</h1>;
          default:
            return null;
        }
      };
    const renderFields = () => {
        switch (option) {
          case Options.LOGIN:
            return (
                <>
                    <p>Glad you're back!</p>
                    <input type="text" placeholder='Username' />
                    <input type="text" placeholder='Password' />
                    <div>
                        <input id='remember-checkbox' type="checkbox" />
                        <label htmlFor="remember-checkbox">Remember Me</label>
                    </div>
                    <button className='purple-gradient'>Login</button>
                    <a className='text-center' onClick={() => setOption(Options.FORGOT)}>Forgot Password</a>
                </>)
          case Options.SIGNUP:
            return (<>
                    <p>Just some details to get you in.!</p>
                    <input type="text" placeholder='Username' />
                    <input type="text" placeholder='Email / Phone' />
                    <input type="text" placeholder='Password' />
                    <input type="text" placeholder='Confirm Password' />
                    <button className='blue-gradient'>Signup</button>
                </>);
          case Options.FORGOT:
            return (
                <>
                    <p>Please enter your email</p>
                    <input type="text" placeholder='example@mail.com' />
                    <button className='pink-gradient'>Reset Password</button>
                </>
            );
          default:
            return null;
        }
    }
    return (
        <div className='login-container flex items-center justify-center'>
            <img src={triangle} alt='something' className='top-left' />
            <img src={square}  className='top-right'/>
            <img src={square}  className='bottom-left flip' />
            <img src={circle} className='bottom-right' />
            <div className='flex login-card column items-center'>
                {renderHeading()}
                <div className='login-fields flex column'>
                    {renderFields()}
                </div>
                {(option == Options.LOGIN || option == Options.SIGNUP) && 
                    <div>
                        <div id="or">Or</div>
                        <div className='icons flex justify-center'>
                            <img src={google} />
                            <img src={facebook} />
                            <img src={github} />
                        </div>
                    </div>
                }
                <div className='links flex column'>
                    <div className='flex justify-center'>
                        {option == Options.LOGIN && <a onClick={() => setOption(Options.SIGNUP)}>Don't have an account? Sign Up</a>}
                        {option == Options.SIGNUP && <a onClick={() => setOption(Options.LOGIN)}>Already registered? Log In</a>}
                    </div>
                    <div className='flex space-between'>
                        <a href="">Terms & Conditions</a>
                        <a href="">Support</a>
                        <a href="">Customer Care</a>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login