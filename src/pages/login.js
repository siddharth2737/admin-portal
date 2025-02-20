import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
            console.log("Token REcieved: ", data.token);            
            localStorage.setItem('token', data.token);
            router.push('/welcome');
        }
        else {
            setError(data.message|| 'Login Faled');
        }
    };

    return (
        <div className = "flex justify-center items-center h-screen">
            <div className = "bg-gray-100 p-8 rounded-2xl shadow-lg">
                <h2 className = "text-xl font-bold text-black text-center p-6">Login</h2>

                <form onSubmit={handleLogin} >
                    <input className = "border p-2 my-2 w-full text-black" type='text' placeholder='Username' autoComplete = "on" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className = "border p-2 my-2 w-full text-black" type='password' placeholder='Password' autoComplete = "on" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className = " bg-blue-500 p-2 text-white w-full rounded" type='submit'>LOGIN</button>
                </form>

                {error && <p>{error}</p>}
            </div>
        </div>
    );
}