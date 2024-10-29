"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import LoadingBar from 'react-top-loading-bar';
import { Menu } from '@headlessui/react';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { globalState, setGlobalState } = useGlobalState();
    const ref = useRef(null);
    // const [href, setHref] = useState(null);

    useEffect(() => {
        ref.current?.continuousStart(5, 100);
    }, [globalState.surfing]);

    useEffect(() => {
        setGlobalState({ ...globalState, pathname });
        ref.current?.complete();

        const profileObj = localStorage.getItem("profileObj");
        profileObj &&
            setGlobalState({ ...globalState, profileObj: JSON.parse(profileObj) });
    }, [pathname]);

    // useEffect(() => {
    //     console.log(globalState.profileObj);
    // }, [globalState.profileObj]);

    const logout = () => {
        localStorage.removeItem("profileObj");
    }

    return <>
        <LoadingBar color='#4768e1' height={3} ref={ref} className={"rounded-md"} loaderSpeed={2000} />
        <nav className="hidden sm:flex h-24 w-full sm:px-10 px-2 sm:pr-6 md:pr-4 lg:pr-10 bg-slate-800 items-center text-white sm:justify-between justify-between">
            <div className="sm:w-28 sm:h-28 w-20 h-20 overflow-hidden grid place-items-center rounded-full -ml-2">
                <img src="/logo.png" alt="logo" className="w-42 h-42" />
            </div>

            <div className="text-2xl sm:text-4xl text-center px-3 w-2/5">
                My Anime Diary
            </div>

            {globalState.profileObj
                ? <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                                alt=""
                                src={globalState.profileObj.picture}
                                className="h-8 w-8 rounded-full"
                            />
                        </Menu.Button>
                    </div>
                    <Menu.Items
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <Menu.Item>
                            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                Your Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <a href={logout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                Sign out
                            </a>
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
                : <>
                    {globalState.pathname
                        ? <div className="flex">
                            <button className="sm:px-3 px-2 py-2 text-white bg-slate-600 rounded-md hover:bg-slate-700" onClick={pathname != "/login"
                                ? (() => {
                                    setGlobalState({ ...globalState, "surfing": !globalState.surfing });
                                    router.push("/login");
                                })
                                : (() => { })}>
                                Get Started &gt;
                            </button>
                        </div>
                        : <div className="size-6 w-10 text-transparent">.</div>
                    }
                </>
            }
        </nav>
    </>
}

export default Navbar;