import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios';

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    
    const navigate = useNavigate(); // useNavigate to programmatically redirect

    async function logout() {
        await axios.post('/logout'); 
        setUser(null); 
        navigate('/'); 
    }

    return (
        <header className='p-4 flex justify-between items-center shadow-md'>
            <Link to={'/'} className='flex items-center gap-1' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className='font-bold text-xl' >
                    She Share Vacation Rentals
                </span>
            </Link>

            <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
                <button className='bg-primary text-white p-2 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            <div className='flex gap-2 border border-gray-300 rounded-sm'>
                {user ? (
                    <button onClick={logout} className='bg-primary text-white p-2 rounded-sm'>Logout</button>
                ) : (
                    <div className='flex gap-2'>
                        <Link to='/login' className='bg-primary text-white p-2 rounded-sm'>Login</Link>
                        <Link to='/register' className='bg-primary text-white p-2 rounded-sm'>Register</Link>
                    </div>
                )}
               
                <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border bg-primary text-white p-2 rounded-sm py-2 px-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div className=" text-white rounded-full border overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {!!user && (
                        <div>
                            {user.name}
                        </div>
                    )}
                </Link>
            </div>
        </header>
    )
}

export default Header
