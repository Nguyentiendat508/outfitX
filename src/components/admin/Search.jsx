import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';


function Search({ handleClickOpen , title}) {
    return (
        <div className='mx-10 mt-3 flex justify-between align-center text-white'>
            <h1>{title}</h1>
            <div className='relative w-1/4'>
                <input className='p-2 border-2 rounded-md w-full ' type="text" placeholder='Search...' />
                <FaSearch className='absolute text-white right-3 top-1/2 -translate-y-1/2' />
            </div>
            
            <button onClick={handleClickOpen}  className='bg-green-900 px-3 py-2 rounded-xl text-white flex items-center gap-1'>ADD <FaCirclePlus /></button>
        </div>
    );
}

export default Search;