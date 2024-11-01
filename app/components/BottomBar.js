"use client";

import { useGlobalState } from '@/context/GlobalStateContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BottomBar() {
    const { globalState, setGlobalState } = useGlobalState();
    const [active, setActive] = useState("");

    useEffect(() => {
        let url = new URL(location.href);
        setActive(url.pathname);
    }, [globalState]);

    const checkActive = (n) => {
        switch (n) {
            case 1:
                return active == "/dashboard";
            case 2:
                return active == "/watchlist";
            case 3:
                return active == "/dashboard/profile";
        }
    }

    return <>
        {globalState.profileObj &&
            <div className="sm:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                    {/* Home */}
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        {active && (() => {
                            let blue = checkActive(1);
                            return <Link href="/dashboard" onClick={() => setGlobalState({ ...globalState, "surfing": !globalState.surfing })}>
                                <svg className={"w-6 h-6 mb-1 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 " + (blue ? "text-blue-600" : "text-gray-500")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
                            </Link>
                        })()}
                    </button>

                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        {active && (() => {
                            let blue = checkActive(2);

                            return <Link href="/dashboard/watchlist" onClick={() => setGlobalState({ ...globalState, "surfing": !globalState.surfing })}>
                                <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                                </svg>
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Watchlist</span>
                            </Link>
                        })()}
                    </button>

                    {/* Profile */}
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        {active && (() => {
                            let blue = checkActive(3);

                            return <Link href="/dashboard/profile" onClick={() => setGlobalState({ ...globalState, "surfing": !globalState.surfing })}>
                                {globalState.profileObj
                                    ? <div className="w-8 h-8 mb-1 border-2 border-gray-900 rounded-full overflow-hidden">
                                        <img src={globalState.profileObj.picture} />
                                    </div>

                                    : <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                }
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span>
                            </Link>
                        })()}
                    </button>
                </div>
            </div>
        }
    </>
}
