import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-pink-400 text-white py-6 mt-3">
            <div className="container mx-auto flex justify-between  ">
                <div  >

                    <h3 className="text-xl font-bold">SHE SHARE</h3>
                    <div className='flex flex-col ' >
                        <Link to="/about-us" className="hover:underline">
                            About Us
                        </Link>
                        <Link to="/about-us" className="hover:underline">
                            Career
                        </Link>
                        <Link to="/about-us" className="hover:underline">
                            Contact Us
                        </Link>
                        <Link to="/about-us" className="hover:underline">
                            Follow On
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold">Support</h3>
                    <div className='flex flex-col' >
                        <Link to="/about-us" className="hover:underline">
                            FAQ
                        </Link>
                        <Link to="/about-us" className="hover:underline">
                            Cancellation Policy
                        </Link>

                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Become a Host</h3>
                    <div className='flex flex-col' >
                        <Link to="/about-us" className="hover:underline">
                            Hosting Resources
                        </Link>
                        <Link to="/about-us" className="hover:underline">
                            Hosting Responsibility
                        </Link>
                        <Link to="/about-us" className="hover:underline">
                            Share a room
                        </Link>
                        <Link to="/about-us" className="hover:underline">
                            Pets
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Terms & Privacy</h3>
                    <div className='flex flex-col' >
                        <Link to="/about-us" className="hover:underline">
                            Terms and Condition
                        </Link>
                        <Link to="/about-us" className="hover:underline">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
