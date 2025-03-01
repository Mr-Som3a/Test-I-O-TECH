import axios from "axios";
import { User } from "../model/interfaces";

const API_URL= process.env.FAKE_API_SERVICE!

export const getUsers=async()=>{
    const {data} = await axios.get(API_URL)
    return data
}

export const postUser=async(reqBody:User)=>{
    const {data} = await axios.post(API_URL,reqBody)
    return data
}

export const updateUser=async(id:number,reqBody:User)=>{
    const {data} = await axios.put(`${API_URL}/${id}/${reqBody}`)
    return data
}

export const deleteUser=async(id:number)=>{
    const {data} = await axios.delete(`${API_URL}/${id}`)
    return data
}