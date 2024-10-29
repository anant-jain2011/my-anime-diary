"use client";

import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import ConfirmDialog from '../components/ConfirmDialog';

const Dashboard = () => {
    const [active, setActive] = useState(true); // true for "Currently Watching", false for "Completed"
    const [animes, setAnimes] = useState([]);
    const { globalState, setGlobalState } = useGlobalState();
    const router = useRouter();

    useEffect(() => {
        localStorage.getItem("animes") &&
            setAnimes(JSON.parse(localStorage.getItem("animes")));

        if (location.href.includes("code=")) {
            const code = location.href.split("code=")[1];
            fetch(`/api/signupgithub?code=${code}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    data.user && (() => {
                        let { name, avatar_url } = data.user;
                        let profileObj = { name, first_name: name.split(" ")[0], picture: avatar_url, animes: [] };

                        /*let res = await fetch("/api/signin", {
                            "method": 'POST',
                            "headers": {
                                'Content-Type': 'application/json'
                            },
                            "body": JSON.stringify(profileObj),
                        });

                        let resp = await res.json();*/

                        localStorage.setItem("profileObj", JSON.stringify(profileObj));

                        setGlobalState({ ...globalState, profileObj });
                    })();
                });
        }

        if (location.href.includes("login")) {
            
        }
    }, []);

    const handleToggle = (mode) => {
        setActive(mode === 'ongoing');
    };

    const handleSwipe = (direction) => {
        setActive(direction !== 'LEFT'); // Swipe left shows "Completed", Swipe right shows "Currently Watching"
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('LEFT'),
        onSwipedRight: () => handleSwipe('RIGHT'),
        preventScrollOnSwipe: false, // Allow scrolling during swipe
        trackMouse: true, // Swipe detection with mouse as well
    });

    const mapData = {
        ongoing: [
            {
                "name": "One Piece",
                "seasonCount": 1,
                "seasons": [
                    {
                        "totalEp": 1120,
                        "watchedEp": 22,
                        "completed": false
                    }
                ]
            },
            {
                "name": "One Punch Man",
                "seasonCount": 2,
                "seasons": [
                    {
                        "totalEp": 12,
                        "watchedEp": 12,
                        "completed": true
                    },
                    {
                        "totalEp": 12,
                        "watchedEp": 0,
                        "completed": false
                    }
                ]
            },
            {
                "name": "Black Clover",
                "seasonCount": 4,
                "seasons": [
                    {
                        "totalEp": 51,
                        "watchedEp": 15,
                        "completed": false
                    },
                    {
                        "totalEp": 51,
                        "watchedEp": 0,
                        "completed": false
                    },
                    {
                        "totalEp": 52,
                        "watchedEp": 0,
                        "completed": false
                    },
                    {
                        "totalEp": 16,
                        "watchedEp": 0,
                        "completed": false
                    }
                ]
            },
            {
                "name": "Black Clover",
                "seasonCount": 4,
                "seasons": [
                    {
                        "totalEp": 51,
                        "watchedEp": 15,
                        "completed": false
                    },
                    {
                        "totalEp": 51,
                        "watchedEp": 0,
                        "completed": false
                    },
                    {
                        "totalEp": 52,
                        "watchedEp": 0,
                        "completed": false
                    },
                    {
                        "totalEp": 16,
                        "watchedEp": 0,
                        "completed": false
                    }
                ]
            }
        ],
        completed: ["Doraemon", "Shinchan", "Pokemon", "Death Note", "Solo Leveling",
            "Shinchan", "Pokemon", "Death Note", "Solo Leveling", "Death Note"],
    };

    const findCurrentEpisode = (anime) => {
        let sw = 1, ew = 0, tew = 0, te = 0;

        anime.seasons.map((season, i, arr) => {
            if (season.completed && arr[i + 1]?.watchedEp > 0) {
                sw++;
            };

            tew += +season.watchedEp;
            te += +season.totalEp;
        });

        ew = `${anime.seasons[sw - 1].watchedEp}/${anime.seasons[sw - 1].totalEp}`;

        return { s: `${sw}/${anime.seasonCount}`, ew, percent: tew / te }
    }

    return (
        <div className="min-h-screen overflow-hidden" {...swipeHandlers}>
            <div className="w-full flex justify-between pr-8 items-center">
                <h1 className="text-4xl mx-4 sm:mx-10 my-4 mt-5">Your Progress</h1>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 active:text-blue-600 cursor-pointer"
                    onClick={globalState.pathname != "/dashboard/add"
                        ? (() => {
                            setGlobalState({ ...globalState, "surfing": !globalState.surfing });
                            router.push("/dashboard/add");
                        })
                        : (() => { })}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>

            <div className="w-full mx-auto mt-6 text-base h-[81vh] overflow-hidden">
                <div className="relative flex justify-around mb-5 sm:mb-10 w-full sm:max-w-md mx-auto sm:text-lg">
                    {/* Toggle Buttons */}
                    <button
                        onClick={() => handleToggle('ongoing')}
                        className={`py-2 px-4 rounded-l-md w-1/2 ${active ? 'text-blue-600' : 'text-gray-600'}`}
                    >
                        Currently Watching
                    </button>

                    <button
                        onClick={() => handleToggle('completed')}
                        className={`py-2 px-4 rounded-r-md w-1/2 ${active ? 'text-gray-600' : 'text-blue-600'}`}
                    >
                        Completed
                    </button>

                    {/* Sliding Bar */}
                    <div className="absolute bottom-0 w-full h-1 bg-gray-200">
                        <div
                            className={`h-1 bg-blue-600 rounded transition-all duration-500 ${active ? 'translate-x-0' : 'translate-x-full'}`}
                            style={{ width: '50%' }}
                        />
                    </div>
                </div>

                {/* Main Components */}
                <div className="relative w-full h-full overflow-hidden">
                    {/* Currently Watching Section */}
                    <div
                        className={`absolute transition-transform duration-500 transform sm:translate-0 w-full pb-4 ${active ? 'translate-x-0' : '-translate-x-full'}`}
                        style={{ maxHeight: 'calc(100% - 70px)', overflowY: 'auto' }}
                    >
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-[auto] justify-left mx-2 sm:mx-16">
                            {animes.map((item, index) => {
                                let animeProg = findCurrentEpisode(item);
                                let percent = Math.round(animeProg.percent * 100 * 100) / 100;

                                return <div key={index} className={"w-full"}>
                                    <div className="py-2 px-5 border-2 border-gray-300 rounded-lg mx-2 mb-4 sm:w-[28%] relative">
                                        <h2 className="text-2xl font-semibold">{item.name}</h2>
                                        <p className="text-sm my-1">
                                            Watched till Episode: {animeProg.ew} of Season: {animeProg.s}
                                        </p>

                                        <div className="bg-white rounded-md shadow-sm border border-gray-900 overflow-hidden mt-3 mb-2 relative">
                                            <div className="relative h-6 flex items-center justify-center">
                                                <div className={`absolute top-0 bottom-0 left-0 rounded-sm bg-blue-500 opacity-75 flex flex-row justify-end`} style={{ "width": percent + "%" }}></div>
                                                <div className="relative text-black font-medium text-base">{percent}%</div>
                                            </div>
                                        </div>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 self-center mt-8 ml-2 cursor-pointer absolute top-0 right-3" onClick={() => {
                                            router.push("/dashboard/edit#" + index);
                                            setGlobalState({ ...globalState, " surfing": !globalState.surfing });
                                        }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>

                                </div>
                                </div>
                            })}
                    </div>
                </div>

                {/* Completed Section */}
                <div
                    className={`absolute transition-transform duration-500 transform sm:translate-0 w-full sm:max-h-full sm:pb-[72px] pb-[80px] ${active ? 'translate-x-full' : 'translate-x-0'}`}
                    style={{ maxHeight: '100%', overflowY: 'auto' }}  // Individual scroll for this section
                >
                    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-left mx-2 sm:mx-16">
                        {mapData.completed.map((item, index) => (
                            <div key={index} className="text-center rounded-lg px-2 mb-4 sm:w-1/4">
                                <div className="text-center border-2 border-gray-300 rounded-lg py-2 flex justify-between pr-4">
                                    <h2 className="text-2xl px-5 font-semibold text-left">{item}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#108705" className="h-8 w-8">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
};

export default Dashboard;
