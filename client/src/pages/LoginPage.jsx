import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setEmail(location.state.email);
            setPassword(location.state.password);
        }
    }, [location.state]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data);
            setRedirect(true);
            alert('Login success');
        } catch (error) {
            alert('Login failed');
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="mb-64">
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form onSubmit={handleLoginSubmit} className='max-w-md mx-auto'>
                    <input type="email" placeholder='your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet?
                        <Link className='underline text-black' to={'/register'}> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
