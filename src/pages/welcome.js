import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import jwt from 'jsonwebtoken'

export default function welcome (){
    const router = useRouter();
    const sec_key = 'bff27443af517d8290c050ded4fa34b562fb54bf52f17ede6e11f52db662a502'
    const [username, setUsername] = useState('')

    useEffect(()=>{
        const token  = localStorage.getItem('token');

        if(!token){
            console.log("token not found");
            
            router.push('/login')
            return;
        }
        try{
            fetch('/api/protected',{
                headers:{'Authorization': `Bearer ${token}`}
            })
            .then (res=> res.json())
            .then(data => {
                if(data.user){
                    setUsername(data.user.username)
                }
                else{
                    console.log("invalid token, logging out");
                    localStorage.removeItem('token');
                    router.push('/login');
                }
            });
        }
        catch(error){
            console.log("error verifying token: ", error);
            
            localStorage.removeItem('token')
            router.push('/login')
        }
    },[])

    const handleLogout = () =>{
        localStorage.removeItem('token')
        router.push('/login');
    }

    return(
        <div className=' h-screen bg-blue-200 flex flex-col items-center justify-center'>
            <h1 className='text-black text-2xl font-semibold'>Welcome, {username}!</h1>
            <button onClick={handleLogout} className='bg-red-500 text-white mt-4 px-6 py-3 rounded-lg hover:bg-red-700'>Logout</button>
        </div>
    )
}