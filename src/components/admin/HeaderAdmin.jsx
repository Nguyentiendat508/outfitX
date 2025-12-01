import React, { useContext, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

function HeaderAdmin() {
    const [show, setShow] = useState(false);
    const { accountLogin, handleLogout } = useContext(AuthContext);
    return (
        <div className='flex p-2 justify-between text-white'>
            <div>
                <h2>Good Morning, Dat</h2>
                <h3>Your performance summary this week</h3>
            </div>
            <div className='flex gap-2 space-x items-center '>
               <IoSearchSharp />
               <IoIosMail />
               <FaBell />
                  <div className='relative'>  
                    <h3 onClick ={() => setShow ((e) => !e)} className='bg-red-600 flex justify-center items-center text-2xl rounded-full w-10 h-10 cursor-pointe '>T</h3>
                           {
                            show &&  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
                                <div
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  cursor-pointer"
                                    >
                                    {accountLogin?.name}
                                </div>
                                <div
                               
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                    Profile
                                </div>
                                <div onClick={handleLogout}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer "
                                    >
                                    Đăng xuất
                                </div>
                                
                            </div>
                           }
                  </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;