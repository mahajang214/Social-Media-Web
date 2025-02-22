import React, { useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Loading from '../Components/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [loginData, setLoginData] = useState({ email: '', password: "" });
    const [loading, setLoading] = useState(false);
    const [clickedSecret, setClickedSecret] = useState(false);
    const [secretKey, setSecretKey] = useState('');
    const navigate=useNavigate();


    
    useGSAP(() => {
        gsap.from('#d', {
            opacity: 1,
            duration: .5,
            y: -100,
            x: -500,
            stagger: .2,
            // repeat: loading ? -1 : 0
        })
       
        gsap.from('#p', {
            opacity: 1,
            duration: .5,
            y: -100,
            x: 500,
            stagger: .2,
            // repeat: loading ? -1 : 0
        });
        gsap.from('#form', {
            opacity: 0,
            duration: .8,
            scale: 0
        })
    });

    useEffect(()=>{
        if(loading){
            gsap.from('#d', {
                opacity: 1,
                duration: .5,
                y: -100,
                x: -500,
                stagger: .2,
                repeat:-1
                // repeat: loading ? -1 : 0
            })
            gsap.from('#p', {
                opacity: 1,
                duration: .5,
                y: -100,
                x: 500,
                stagger: .2,
                repeat:-1
                // repeat: loading ? -1 : 0
            });

        }
    },[loading]);
    
    const fillData = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        if (clickedSecret) {
            setLoading(true);
            const send=await axios.post(`${import.meta.env.VITE_URL}/api/auth/login`,{userLoginSecretKey:secretKey});
            console.log(send.data);
            setLoading(false);
            navigate('/');
            return;
        }
        try {
            setLoading(true);
            const send=await axios.post(`${import.meta.env.VITE_URL}/api/auth/login`,{email:loginData.email,password:loginData.password});
            console.log(send.data);
            setLoading(false);
            navigate('/');
            return;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <div className='w-full h-screen flex justify-between items-center bg-[#1A1A19]'>
            <div className='w-1/4 h-full bg-[#1a1a19c8] overflow-hidden py-4'>
                <div id='d' className='w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 '></div>
                <div id='d' className='w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 '></div>
                <div id='d' className='w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 '></div>
                <div id='d' className='w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 '></div>
                <div id='d' className='w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 '></div>

                <div id='d' className='w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 '></div>

                <div id='d' className='w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 '></div>

                <div id='d' className='w-full  h-[6vh] bg-linear-100 to-[#ffffff34] rotate-6 scale-110  from-red-500 mt-12 '></div>
            </div>
            <div className='w-2/4 h-screen flex justify-center items-center'>

                <form id='form' className='w-[30vw] py-5 px-3 bg-[#ffffff34] rounded-lg text-white ' onSubmit={submitHandler} action="">
                    <h1 className='text-3xl text-center mb-5 font-bold'>Login Now</h1>


                    <input className='w-full outline-none text-2xl px-5 py-2 rounded-full bg-[#ffffff46] mt-3' onChange={(e) => fillData(e)} type="email" placeholder='Email' name='email' value={loginData.email} />
                    <br />
                    <input className='w-full outline-none text-2xl px-5 py-2 rounded-full bg-[#ffffff46] mt-3 ' onChange={(e) => fillData(e)} type="password" placeholder='Password' name='password' value={loginData.password} />
                    <br />


                    {loading ? <Loading /> : <button className='w-full outline-none cursor-pointer active:scale-95 text-2xl px-5 font-bold py-2 rounded-md bg-[#ffffff46] mt-4 '>
                        Login
                    </button>}


                    <span className='ml-5 mt-7 text-red-400 underline cursor-pointer ' onClick={() => setClickedSecret(!clickedSecret)}>you have secret login key?</span>
                    {clickedSecret && <input id='secret' className='w-full outline-none text-2xl px-5 py-2 rounded-full bg-red-400 mt-2 ' onChange={(e) => {
                        setSecretKey(e.target.value);

                    }} type="text" placeholder='Enter your secret key' name='secretKey' value={secretKey} />}


                </form>
            </div>
            <div className='w-1/4 h-full bg-[#1a1a19c8] overflow-hidden py-4'>
                <div id='p' className='w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 '></div>
                <div id='p' className='w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 '></div>
                <div id='p' className='w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 '></div>
                <div id='p' className='w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 '></div>
                <div id='p' className='w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 '></div>
                <div id='p' className='w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 '></div>
                <div id='p' className='w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 '></div>
                <div id='p' className='w-full  h-[6vh] bg-linear-100 from-[#ffffff34] -rotate-6 scale-110  to-red-500 mt-12 '></div>
            </div>

        </div>
    )
}

export default Login