import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MainPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const fetchdata = await axios.get(`${import.meta.env.VITE_URL}/api/chat`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );
                setUsers(fetchdata.data);
                console.log(fetchdata.data);
            } catch (error) {
                console.log("Error in fetching users", error.message);

            }

        }
        fetchAllUsers();
    }, [])

    return (
        <div className='w-full h-screen bg-[#1A1A19] px-5 text-white flex justify-between items-center'>
            <div className='w-1/3 h-full bg-[#00acb5d9] py-2 rounded-r-md'>
                <h1 className='text-3xl font-bold text-center mt-1 '>All Users</h1>
            </div>
            <div className='w-2/3 h-full'></div>

        </div>
    )
}

export default MainPage
// bg-linear-to-t from-red-500 via-[#1A1A19]  to-red-500