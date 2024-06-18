import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function registerUser(e) {
        e.preventDefault();

        try {
            const response = await axios.post('/register', {
                name,
                email,
                password
            });
           
            if (response.status === 200) { // Assuming 201 as the expected success status
                alert('Registration successful!');
                navigate('/login', { state: { email, password } }); // Redirect to the login page with credentials
            } else {
                
                setError('Unexpected response. Please try again.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
        }
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form onSubmit={registerUser} className='max-w-md mx-auto'>
                    {error && <div className='text-red-500 text-center mb-4'>{error}</div>}
                    <input type="text" placeholder='Your Name' value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder='your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already have an account?
                        <Link className='underline text-black' to={'/login'}> Login </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
