import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SelectAllInfo } from "../Redux/InfoSlice";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL="https://info-website-1.onrender.com/data";

const EditInfo= ()=> {

    const info= useSelector(SelectAllInfo);
    const [input,setInput]= useState({title:info.title, content:info.content, author:info.author});
    const navigate= useNavigate();

    const handleChange= (event)=> {
        const {name,value}= event.target;
        setInput((prevValue)=> {
            return {...prevValue, [name]:value}
        });
    }

    const handleSubmit= async(event)=> {
        event.preventDefault();
        
        try {
            if (input.title?.trim()!=="" && input.author?.trim()!=="" && input.content?.trim()!=="") {
                const body= {
                 id: nanoid(),
                 title: input.title?.trim(),
                 content: input.content?.trim(),
                 author: input.author?.trim(),
                 date: new Date().toISOString()
               };
              const response= await axios.patch(API_URL+`/${info.id}`,body);
              const result= response.data;
              setInput({title:"", content:"", author:""});
              navigate("/Info_Website");
            } else {
                alert("Enter title, content and author to edit info");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (<div>
        <h1>Edit Existing Info</h1>
        <form id="newPostForm">
          <input type="text" name="title" placeholder="Title" required onChange={handleChange} value={input.title}/>
          <textarea name="content" placeholder="Content" required rows="10" onChange={handleChange} value={input.content} />
          <input type="text" name="author" placeholder="Author" required onChange={handleChange} value={input.author}/>
          <button className="full-width" type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    </div>);
}

export default EditInfo;