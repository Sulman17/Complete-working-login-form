/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import profilepic from '../images/perfil.png';
import {useHistory} from 'react-router-dom';

const About = () => {
    const history = useHistory();
    // *to make about page dynamic so user can store his information
    const [ userData , setUserData] = useState({});
    // !Effect HOOK
// *to edit about us credentials
 const callAboutPage = async () => {
          try{
            const res = await fetch("/about",{
                method : "GET",
                headers :{
               Accept: "application/json",
               "Content-Type": "application/json"
                },
                credentials:"include"
            });

        const data = await res.json();
        console.log(data);
        setUserData(data);

        if(!res.status === 200) {
            const error = new Error(res.error);
            throw error;
        }

          }catch(err){console.log(err);
            history.push('/login');
        }
 };

    useEffect(() => {
       callAboutPage();
    }, []);

    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                            <img src={profilepic} alt="profile"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {userData.name}
                                </h5>
                                <h6>Web Developer</h6>
                                   <p className="profile-rating mt-3 mb-5">
                                      RANKING: <span>9/10</span>
                                   </p>
                                   <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                     <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-expanded="false">About</a>
                                    </li>
                                     <li className="nav-item">
                                     <a className="nav-link active show" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-expanded="true">Timeline</a>
                                    
                                      </li>
                                     
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                             <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                        </div>
                    </div>
                    <div className="row">
                             <div className="col-md-4">
                                 <div className="profile-work">
                                      <p>My Portfolio</p>
                                      <a href="https://github.com/Sulman17?tab=repositories" target="_salamn">GitHib</a><br />
                                      <a href="https://www.linkedin.com/in/salman-hamza-895b9316a/" target="_salman">LinkedIn</a><br />
                                      <a href="https://slmnhmza.great-site.net/?i=1" target="_salman">Portfolio Website</a><br />
                                      <a href="https://github.com/Sulman17?tab=repositories" target="_salman">Web developer</a><br />
                                      <a href="https://github.com/Sulman17?tab=repositories" target="_salman">Figma</a><br />

                                 </div>
                             </div>
                             <div className="col-md-8 pl-5 about-info">
                                 <div className="tab-content profile-tab" id="myTabContent">
                                   <div className="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">

                                     <div className="row">
                                         <div className="col-md-6">
                                            <label >User ID</label>
                                         </div>
                                         <div className="col-md-6">
                                            9256482-28363
                                         </div>
                                     </div>
                                     <div className="row mt-3">
                                         <div className="col-md-6">
                                            <label >Name</label>
                                         </div>
                                         <div className="col-md-6">
                                            {userData.name}
                                         </div>
                                     </div>
                                     <div className="row mt-3">
                                         <div className="col-md-6">
                                            <label >Email</label>
                                         </div>
                                         <div className="col-md-6">
                                            {userData.email}
                                         </div>
                                     </div>
                                     <div className="row mt-3">
                                         <div className="col-md-6">
                                            <label >Phone Number</label>
                                         </div>
                                         <div className="col-md-6">
                                             {userData.phone}
                                         </div>
                                     </div>
                                     <div className="row mt-3">
                                         <div className="col-md-6">
                                            <label >Profession</label>
                                         </div>
                                         <div className="col-md-6">
                                            Web Developer
                                         </div>
                                     </div>

                                   </div>
                                 </div>
                             </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default About
