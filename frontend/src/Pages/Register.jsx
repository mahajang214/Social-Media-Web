import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState({ sc: false, c: false, n: false });
    const [passwordWriting, setPasswordWriting] = useState(false);
    const elRef = useRef(null);
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
        if (passwordWriting) {

            gsap.from('.validations', {
                duration: 1,
                opacity: 1,
                y: -20
            })


        }
    }, [])
    const registerUser = (e) => {
        e.preventDefault();
    }
    return (
        <div className='text-white bg-[#1A1A19] flex justify-between items-center w-full h-screen'>
            <div className='w-1/3 h-full bg-pink-400'></div>
            <div className='w-2/3 h-full flex justify-center  items-center'>
                <form className='w-[30vw] py-5 px-3 bg-[#ffffff34] rounded-lg' onSubmit={registerUser} action="">
                    <h1 className='text-3xl text-center mb-5 font-bold'>Register Now</h1>
                    <input className='w-full outline-none text-2xl px-5 py-2 rounded-full bg-[#ffffff46] mt-2 ' onChange={(e) => {
                        setName(e.target.value);
                        if (name.length > 3) {
                            alert("name must be 3 charactes long");
                            setName("");
                            return;
                        }
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
                        console.log(password);
                        if (validate.c === false) {
                            // if (password.length<8) {
                            //     alert('Password must be 8 characters long');
                            // }
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


                    <button className='w-full outline-none cursor-pointer active:scale-95 text-2xl px-5 font-bold py-2 rounded-md bg-[#ffffff46] mt-4 '>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register