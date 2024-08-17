import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../ui/SubmitButton";
import { useSignup } from "../../Hooks/useSignup";

const Signup = () => {
    const navigate = useNavigate();
    const {signup, isLoading, error} = useSignup();
    const [userData, setUserData] = useState({
        firstname : '',
        lastname : '',
        username : '',
        password : ''
    })
    const [repPass, setRepPass]= useState('')
    const handleSignup = async (e) => {
        e.preventDefault();
        try{
            await signup(userData) 
            navigate('/feed ')
        }catch(err){
            console.log(err);
            
        }
    }
    return (
        <form className="flex flex-col items-center justify-center bg-blue-200 p-4 rounded-lg lg:w-[35vw]">
            <h1 className="text-2xl font-Poppins font-bold">BaiTask</h1>
            <p className="font-Poppins">Your trusted task buddy</p>
            <h1 className="mt-3 font-Poppins text-3xl">Signup</h1>
            <div className="flex flex-col mt-3 lg:w-full">
                <input type="text" placeholder="First Name" value = {userData.firstname} onChange={(e)=>setUserData({...userData, firstname : e.target.value})} className="p-3 w-[80vw] rounded-md mb-4 font-Poppins lg:w-full" />
                <input type="text" placeholder="Last Name" value = {userData.lastname} onChange={(e)=>setUserData({...userData, lastname : e.target.value})} className="p-3 w-[80vw] rounded-md mb-4 font-Poppins lg:w-full" />
                <input type="text" placeholder="Username" value = {userData.username} onChange={(e)=>setUserData({...userData, username : e.target.value})} className="p-3 w-[80vw] rounded-md mb-4 font-Poppins lg:w-full" />
                <input type="password" placeholder="Password" value = {userData.password} onChange={(e)=>setUserData({...userData, password : e.target.value})} className="p-3 w-[80vw] rounded-md mb-4 font-Poppins lg:w-full" />
                <input type="password" placeholder="Repeat Password" value = {repPass} onChange={(e)=>setRepPass(e.target.value)} className="p-3 w-[80vw] rounded-md mb-4 font-Poppins lg:w-full" />
                <SubmitButton value={'Submit '} onClick={handleSignup}/>
                <div >
                    <p className="text-sm mt-5 font-Poppins text-center">Already have an account? <Link to={'/login'}>Login</Link></p>
                </div>
            </div>
        </form>
    )
}
export default Signup;