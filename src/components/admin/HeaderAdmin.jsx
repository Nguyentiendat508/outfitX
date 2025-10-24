import React from 'react';
import { FaBell } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';

function HeaderAdmin() {
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
               <h3 className='bg-red-600 flex justify-center items-center text-2xl rounded-full w-10 h-10 cursor-pointe '>T</h3>
            </div>
        </div>
    );
}

export default HeaderAdmin;