"use client";

import React from 'react';

const Navbar = () => {
    return (
        <nav className="hidden sm:flex h-24 w-full sm:px-10 px-2 sm:pr-6 md:pr-4 lg:pr-10 bg-slate-800 items-center text-white sm:justify-between justify-between">
            <div className="sm:w-28 sm:h-28 w-20 h-20 overflow-hidden grid place-items-center rounded-full -ml-2">
                <img src="/logo.png" alt="logo" className="w-42 h-42" />
            </div>

            <div className="text-2xl sm:text-4xl text-center px-3 w-2/5">
                My Anime Diary
            </div>

            <div className="flex">
                <button className="sm:px-3 px-2 py-2 text-white bg-slate-600 rounded-md hover:bg-slate-700">
                    Get Started &gt;
                </button>
            </div>
        </nav>
    )
}

export default Navbar;