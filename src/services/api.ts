import axios from "axios";
import { User } from "../model/interfaces";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

export const getUsers=async()=>{
    const {data} = await axios.get(apiUrl)
    return data
}

export const postUser=async(reqBody:User)=>{
    const {data} = await axios.post(apiUrl,reqBody)
    return data
}

export const updateUser=async(id:number,reqBody:User)=>{
    const {data} = await axios.put(`${apiUrl}/${id}/${reqBody}`)
    return data
}

export const deleteUser=async(id:number)=>{
    const {data} = await axios.delete(`${apiUrl}/${id}`)
    return data
}