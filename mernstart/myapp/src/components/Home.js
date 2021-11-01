import React, { useState, useEffect } from 'react'

const Home = () => {

    const [user, setUser] = useState("");
    const [show, setShow] = useState(false);
    const userName = async () => {
      try {
        const res = await fetch("/getData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await res.json();
        // console.log(data);
        setUser(data.name);
        setShow(true);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      userName();
    }, []);

    return (
        <>
        <div className="home-page">
            <div className="home-div">
              <p className="pt-5">HELLO</p>
              <h1>{user}</h1>
              <h2>{show ? "Welcome,Happy to see you" : "I am a developer"}</h2>
            </div>
        </div>
        </>
    )
}

export default Home
