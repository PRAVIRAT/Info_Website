import React from "react";
import {useSelector, useDispatch} from "react-redux"
import { deleteInfo, editInfo, SelectAllInfo, setInfo } from "../Redux/InfoSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL= "https://info-website-1.onrender.com/";

const Home= ()=> {
    
    const info= useSelector(SelectAllInfo);
    const dispatch= useDispatch();
    const navigate= useNavigate();

    useEffect(()=> {
        const fetchData= async () => {
            try {
                const response= await axios.get(API_URL);
                const result= response.data;
                dispatch(setInfo(result));
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, []);

    const handleDelete= async(id)=> {
        dispatch(deleteInfo(Number(id)));
        
        try {
            const response= await axios.delete(API_URL+`data/${id}`);
            const result= await response.data;
            dispatch(setInfo(result));
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleEdit= (item)=> {
        dispatch(editInfo(item));
        navigate("/edit");
    }

    return (<div>
        <h1>General Info</h1>
        <button id="newPostBtn" onClick={()=> navigate("/new")}>New Post</button>

        {info.length ? (info.map((item,index)=> {
            return <ul key={item.id}> 
                <h2>Title: {item.title}</h2>
                <small>Date: {item.date}</small>
                <p>Content: {item.content}</p>
                <small>Author: {item.author}</small>
                <button className="edit" onClick={()=> handleEdit(item)}>Edit</button> <button className="delete" onClick={()=> handleDelete(index)}>Delete</button>
             </ul>
        })) : <h2> No Data to display </h2>}

    </div>)
}

export default Home;