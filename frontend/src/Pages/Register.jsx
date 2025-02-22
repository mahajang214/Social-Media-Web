import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import axios from 'axios';
import Loading from "../Components/Loading.jsx";
import { useNavigate } from "react-router-dom";
function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState({ sc: false, c: false, n: false });
    const [passwordWriting, setPasswordWriting] = useState(false);
    const elRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();



    // const fillData = (e) => {
    //     setRegistrationData({
    //         [e.target.name]: e.target.value
    //     });
    //     // console.log(registrationData.password.includes("1"||"2"||"3"||"4"||"5"||"6"||"7"||"8"||"9"||"0"));
    //     // console.log(validate.n===false);


    //     //  }   1||2||3||4||5||6||7||8||9||0
    //     // if (validate.n === false) {
    //     //     if (registrationData.password.includes("1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0")) {
    //     //          document.querySelector("#checkbox-num").click();
    //     //          return setValidate({ n: true });
    //     //     }

    //     // }
    // }

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 5000)
        }
    }, [])

    useGSAP(() => {
        gsap.from('#d', {
            opacity: 1,
            duration: .5,
            y: -100,
            x: -500,
            stagger: .2
        })
        gsap.from('#p', {
            opacity: 1,
            duration: .5,
            y: -100,
            x: 500,
            stagger: .2
        });
        gsap.from('#form', {
            opacity: 0,
            duration: .8,
            scale: 0
        })
        // gsap.to('#form',{
        //     opacity:1,
        //     duration:.8,
        //     scale:1
        // })
    })

    const registerUser = async (e) => {
        e.preventDefault();
        // if (clickedSecret) {
        //     setLoading(true);
        //     const res = await axios.post(`${import.meta.env.VITE_URL}/api/auth/register`, { userLoginSecretKey: secretKey });
        //     console.log(res.data);
        //     setLoading(false);
        //     return;


        // }
        if (name.length < 3) {
            alert("name must be 3 charactes long");
            setName("");
            return;
        }
        if (password.length < 8) {
            alert('Password must be 8 characters long');
            return;
        }
        if (validate.c && validate.sc && validate.n === true) {
            // console.log(import.meta.env.VITE_URL);
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_URL}/api/auth/register`, { name, email, password });
            console.log(res.data);
            setLoading(false);
            navigate('/login');
            return;

        }
        alert("Password does not match to rules");
        return;
    }
    return (
        <div className='text-white bg-[#1A1A19] flex justify-between items-center w-full h-screen'>
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
            <div className='w-2/4 h-full flex justify-center  items-center'>
                <form id='form' className='w-[30vw] py-5 px-3 bg-[#ffffff34] rounded-lg' onSubmit={registerUser} action="">
                    <h1 className='text-3xl text-center mb-5 font-bold'>Register Now</h1>
                    <input id='name' className='w-full outline-none text-2xl px-5 py-2 rounded-full bg-[#ffffff46] mt-2 ' onChange={(e) => {
                        setName(e.target.value);

                    }} type="text" placeholder='Name' name='name' value={name} />
                    <br />
                    <input className='w-full outline-none text-2xl px-5 py-2 rounded-full bg-[#ffffff46] mt-3' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' name='email' value={email} />
                    <br />
                    <input className='w-full outline-none text-2xl px-5 py-2 rounded-full bg-[#ffffff46] mt-3 ' onChange={(e) => {
                        setPasswordWriting(true);
                        setPassword(e.target.value);
                        if (validate.n === false) {
                            // if (password.includes("1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0")) {
                            //     document.querySelector("#validation-n").style.color = 'green';
                            //     return setValidate({ ...validate, n: true });
                            // }
                            const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

                            const hasDigit = digits.some(digit => password.includes(digit));

                            if (hasDigit) {
                                document.querySelector("#validation-n").style.color = 'green';
                                return setValidate({ ...validate, n: true });
                            }

                        }

                        if (validate.sc === false) {
                            // if (password.includes("!" || "\"" || "#" || "$" || "%" || "&" || "'" || "(" || ")" || "*" || "+" || "," || "-" || "." || "/" || ":" || ";" || "<" || "=" || ">" || "?" || "@" || "[" || "\\" || "]" || "^" || "_" || "`" || "{" || "|" || "" || "~")) {
                            //     document.querySelector("#validation-sc").style.color='green';
                            //     return setValidate({ ...validate, sc: true });
                            // }
                            const specialChars = ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

                            const hasSpecialChar = specialChars.some(char => password.includes(char));

                            if (hasSpecialChar) {
                                document.querySelector("#validation-sc").style.color = 'green';
                                return setValidate({ ...validate, sc: true });
                            }

                        }
                        // console.log(password);
                        if (validate.c === false) {

                            if (password.length > 6) {
                                document.querySelector("#validation-c").style.color = 'green';
                                return setValidate({ ...validate, c: true });
                            }
                        }

                    }} type="password" placeholder='Password' name='password' value={password} />
                    <br />

                    {passwordWriting &&
                        (< ><div id='validation-c' className='validations w-full px-5 flex items-center gap-3 mt-2 text-red-500'><li><p>Password must be 8 characters long</p></li></div>
                            <div id='validation-sc' className='validations w-full px-5 flex items-center gap-3 mt-2 text-red-500'><li><p>Password must be include 2 special character </p></li></div>
                            <div id='validation-n' className='validations w-full px-5 flex items-center gap-3 mt-2 text-red-500'><li><p>Password must be includes 2 number </p></li></div></>)}


                    {loading ? <Loading /> : <button className='w-full outline-none cursor-pointer active:scale-95 text-2xl px-5 font-bold py-2 rounded-md bg-[#ffffff46] mt-4 '>
                        Register
                    </button>}
                    
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

export default Register