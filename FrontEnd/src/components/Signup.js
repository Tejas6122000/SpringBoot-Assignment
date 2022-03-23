import React, { Component,useCallback,useState } from 'react'
import {useNavigate} from "react-router-dom"
import Form from 'react-bootstrap/Form';
function Signup(){
    const navigation = useNavigate();
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');

    const HandleUsernameChange=useCallback((event)=>{
        setusername(event.target.value)
    }) 

    const HandlePasswordChange=useCallback((event)=>{
        setpassword(event.target.value)
    }) 
        
    const HandleSubmit=useCallback((event)=>{
        let names=JSON.stringify({username}).split(":")[1].split("}")[0]
        let pass=JSON.stringify({password}).split(":")[1].split("}")[0]
        names=names.replace(/"/g,"")
        pass=pass.replace(/"/g,"")

        let data={
            "name":names,
            "password":pass
        }
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
          })
          .then(response => response.text())
          .then(response=>{
              console.log(response)
              if(response==="-1"){
                alert("Username Already Exists!")
                navigation("/signup")
              }
              else
              {
              localStorage.setItem('username',response)
              navigation("/")
              }
            })
            .catch((error) => {
                console.log(error)
                alert("Internal Server Error!")
                navigation("/login")
        });


    }) 


    return (
            <div className={'login'}>
              <h1 className={'mb-3'}>Please Signup</h1>
                <div className={'mb-3'}>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={HandleUsernameChange}
                    required
                  />
                </div>
                <div className={'mb-5'}>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={HandlePasswordChange}
                    required
                  />
                </div>
                <button className={'btn btn-secondary login'} onClick={HandleSubmit}>
                  Submit
                </button>
            </div>
        );
}




export default Signup