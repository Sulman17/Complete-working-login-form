/* eslint-disable no-unused-vars */

// *we use usestate for connecting form with server
import React ,{useState, useContext } from 'react';
// * useHistory is for redircting after login to homepage
import { NavLink , useHistory} from 'react-router-dom'
import loginpic from '../images/login.svg'
import { UserContext } from "../App";

const Login = () => {
    const { dispatch } = useContext(UserContext);
    const history = useHistory();
    // * we use it to get date from user and save it in frontend
    const [email, setEmial] = useState('');
    const [password, setPassword] = useState('');
    // *using FETCH API to send data in database on click 
    const loginUser = async (e) => {
        e.preventDefault();
         const res = await fetch('/login' , {
             method: "POST",
             headers : {'Content-Type': 'application/json'
            },
             body: JSON.stringify({
                 email,
                 password,
             }),
         });
        //  * getting data into the database from pending status 
        const data = await res.json();
        if (res.status === 400 || !data){
        alert("Invalid credenitials");
                }else{
            dispatch({ type: "USER", payload: true });
            alert("login successful");
            history.push("/");
        }
    };
    return (
        <>
           <section className="sign-in">
               <div className="container mt-5">
                   <div className="signin-content">
                   <div className="signin-image">
                                <figure>
                                    <img src={loginpic} alt="login pic"  />
                                </figure>
                                <NavLink to="/register" className="signup-image-link">Create a new account</NavLink>
                          </div>
                      <div className="signin-form">
                          <h2 className="form-title">Login</h2>
                          <form method="POST" className="register-form" id="register-form">
                          

                          <div className="form-group">
                              <label htmlFor="email">
                              <i className="zmdi zmdi-email material-icons-name"></i>
                              </label>
                              <input type="email" name="email" id="email" autoComplete="off" placeholder="Email" value={email}
                              onChange={(e) => setEmial(e.target.value)} />
                          </div>

                                      
                          <div className="form-group">
                              <label htmlFor="password">
                              <i className="zmdi zmdi-lock material-icons-name"></i>
                              </label>
                              <input type="password" name="password" id="password" autoComplete="off" placeholder="Password" value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                          </div>
                          
                         <div className="form-group form-button">
                              <input type="submit" name="signin" id="signin" className="form-submit" value="Login"
                              onClick={loginUser} />
                         </div>
                          </form>
                          </div>
                          
                       
                   </div>
               </div>
           </section> 
        </>
    )
}

export default Login
