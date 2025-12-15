import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newInfo } from "../Redux/InfoSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL= "https://info-website-1.onrender.com/data";

const NewInfo= ()=> {

    const [input,setInput]= useState({title:"", content:"", author:""});
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const handleChange= (event)=> {
        const {name,value}= event.target;
        setInput((prevValue)=> {
            return {...prevValue, [name]: value}
        });
    }

    const handleSubmit= async(event)=> {
        event.preventDefault();
        
        try {
           if (input.title?.trim()!=="" && input.content?.trim()!=="" && input.author?.trim()!=="") {
            const body= {
              id: nanoid(),
              title: input.title?.trim(),
              content: input.content?.trim(),
              author: input.author?.trim(),
              date: new Date().toISOString(),
             };
           dispatch(newInfo(body));
           const response= await axios.post(API_URL,body);
           const result= response.data;
           setInput({title:"", content:"", author:""});
           navigate("/Info_Website"); 
           } else {
            alert("Enter title, content and author to make a info");
           }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (<div>
        <h1>Enter New Info</h1>
        <form id="newPostForm">
          <input type="text" name="title" placeholder="Title" required onChange={handleChange} value={input.title}/>
          <textarea name="content" placeholder="Content" required rows="10" onChange={handleChange} value={input.content}></textarea>
          <input type="text" name="author" placeholder="Author" required onChange={handleChange} value={input.author}/>
          <button className="full-width" type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    </div>);
}

export default NewInfo;