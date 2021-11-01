/* eslint-disable no-unused-vars */
//! Store User Registration Form Data in Front-End React State
import React, {useState} from 'react'
import { NavLink, useHistory} from 'react-router-dom'
import registerpic from '../images/signup.svg'

const Register = () => {
    const history = useHistory();
    // *state hook
        const [user,setUser] = useState({
          name: "", email: "", phone: "", password: "", confirmPassword: "",
    });
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        // *spread operator
        setUser({...user, [name]:value});
    }
    // *Fetch API
    const PostData = async (e) => {
         e.preventDefault();
         const { name, email, phone, password, confirmPassword} = user;
         const res = await fetch('/register',{
             method: 'POST',
             headers: { 'Content-Type': 'application/json'},
             body: JSON.stringify({              
                name, email, phone, password, confirmPassword
             })
         });
         const data = await res.json();
         if(res.status === 422 || !data){
             window.alert("invalid registration");
             console.log("invalid registration");
         }else{
            window.alert("Registration Successful");
            console.log("Registration Successful");
            // * sending to login form after successful registration
              history.push("/Login");
         }
    }
    return (
        <>
           <section className="signup">
               <div className="container mt-5">
                   <div className="signup-content">
                      <div className="signup-form">
                          <h2 className="form-title">Signup</h2>
                          <form method="POST"className="register-form" id="register-form">
                          <div className="form-group">
                              <label htmlFor="name">
                              <i className="zmdi zmdi-account material-icons-name"></i>
                              </label>
                              <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"
                              value={user.name}
                              onChange={handleInputs} />
                              
                          </div>

                          <div className="form-group">
                              <label htmlFor="email">
                              <i className="zmdi zmdi-email material-icons-name"></i>
                              </label>
                              <input type="email" name="email" id="email" autoComplete="off" placeholder="Email" 
                               value={user.email} 
                               onChange={handleInputs}/>
                             
                          </div>

                          <div className="form-group">
                              <label htmlFor="phone">
                              <i className="zmdi zmdi-phone material-icons-name"></i>
                              </label>
                              <input type="number" name="phone" id="phone" autoComplete="off" placeholder="Phone Number" 
                              value={user.phone}
                              onChange={handleInputs}/>
                              
                          </div>

                          
                          <div className="form-group">
                              <label htmlFor="password">
                              <i className="zmdi zmdi-lock material-icons-name"></i>
                              </label>
                              <input type="password" name="password" id="password" autoComplete="off" placeholder="Password" 
                                value={user.password}
                                onChange={handleInputs}/>
                            
                          </div>
                          <div className="form-group">
                              <label htmlFor="confirmPassword">
                              <i className="zmdi zmdi-lock material-icons-name"></i>
                              </label>
                              <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="off" placeholder="Confirm Password"
                               value={user.confirmPassword}
                               onChange={handleInputs} />

                             
                          </div>
                          
                         <div className="form-group form-button">
                              <input type="submit" name="signup" id="signup" className="form-submit" value="Sign Up" onClick={PostData} />
                         </div>
                          </form>
                          </div>
                          <div className="signup-image">
                                <figure>
                                    <img src={registerpic} alt="signup pic"  />
                                </figure>
                                <NavLink to="/login" className="signup-image-link">Already have an account?</NavLink>
                          </div>
                       
                   </div>
               </div>
           </section>
        </>
    )
}

export default Register
