import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../ui/SubmitButton";
import { useLogin } from "../../Hooks/useLogin";
import { useState } from "react";
const Login = () => {
    const {login, isLoading, error} = useLogin();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) =>{
        e.preventDefault();
        await login(username, password);
        navigate('/feed')
    }
    return (
        <form className="flex flex-col items-center justify-center bg-blue-200 p-4 rounded-lg lg:w-[35vw]">
            <h1 className="text-2xl font-Poppins font-bold">BaiTask</h1>
            <p className="font-Poppins">Your trusted task buddy</p>
            <h1 className="mt-3 font-Poppins text-3xl">Login</h1>
            <div className="flex flex-col mt-3 lg:w-full">
                <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} className="p-3 w-[80vw]  lg:w-full rounded-md mb-4 font-Poppins" />
                <input type="text" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="p-3 w-[80vw] lg:w-full rounded-md mb-4 font-Poppins " />
                <SubmitButton value={'Submit '} onClick={handleLogin} disabled={isLoading}/>
                <p className="text-sm mt-3 font-Poppins">Forgot Password</p>
                <div >
                    <p className="text-sm mt-5 font-Poppins text-center">Doesn't have an account? <Link to={'/signup'}>Sign up</Link></p>
                </div>
            </div>
        </form>
    )
}
export default Login;