import React, { Component,useCallback,useState } from 'react'
import  { Redirect } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Form from 'react-bootstrap/Form';

function Create(){
    const navigation = useNavigate();
    const [title,settitle] = useState('');
    const [body,setbody] = useState('');

    const HandleTitleChange=useCallback((event)=>{
        settitle(event.target.value)
    }) 

    const HandleBodyChange=useCallback((event)=>{
        setbody(event.target.value)
    }) 
        
    const HandleSubmit=useCallback((event)=>{
        let bt=JSON.stringify({title}).split(":")[1].split("}")[0]
        let bb=JSON.stringify({body}).split(":")[1].split("}")[0]
        bt=bt.replace(/"/g,"")
        bb=bb.replace(/"/g,"")

        let data={
            "title":bt,
            "body":bb,
            "createdby":localStorage.getItem('username')
        }
        fetch('http://localhost:8080/create', {
            // mode: 'cors',
            method: 'POST',
            // credentials: 'same-origin',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin':'*'
              },
            body:JSON.stringify(data)
          })
          .then(response=>response.text())
          .then(response=>{
            if(response==="1"){
              alert("Blog Created Successfully!")
              navigation("/")
            }
            else{
              alert("Something Went wrong!")
              navigation("/")
            }             
            })
            .catch((error) => {
                console.log(error)
                alert("Internal Server Error")
                navigation("/")
        });

    }) 

    
    if(localStorage.getItem('username'))
    {
        return (
            <div className={'login'}>
              <h1 className={'mb-3'}>Create a Blog</h1>
                <div className={'mb-3'}>
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={HandleTitleChange}
                    required
                  />
                </div>
                <div className={'mb-5'}>
                  <Form.Label>Body:</Form.Label>
                  <Form.Control
                    type="text"
                    value={body}
                    onChange={HandleBodyChange}
                    required
                  />
                </div>
                <button className={'btn btn-primary'} onClick={HandleSubmit}>
                  Submit
                </button>
            </div>
        );
    }
    else{
            return (<h1 className='login'>You are not Logged In!</h1>)
    }
}




export default Create