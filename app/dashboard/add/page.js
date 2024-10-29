"use client";

import React, { useState } from 'react';
import { Button, Field, Input, Label, Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import AnimeAddedDialog from '@/app/components/AnimeAddedDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
    const [formData, setFormData] = useState({});
    const [enabled, setEnabled] = useState(false);
    const [seasonCount, setSeasonCount] = useState(1);
    const { globalState, setGlobalState } = useGlobalState();
    const [isOpen, setIsOpen] = useState(false);
    const [seasons, setSeasons] = useState([{
        "totalEp": 0,
        "watchedEp": 0,
        "completed": false
    }]);
    const [singleSeason, setSingleSeason] = useState({});
    const router = useRouter();

    const handleSubmit = (e) => {
        let details = { ...formData };

        enabled
            ? details = { // agar seasons hai toh ye kro
                ...details,
                seasonCount,
                seasons
            }
            : details = { // agar seasons nhi hai toh ye kro
                ...details,
                "seasonCount": 1,
                seasons: [singleSeason]
            };

        let prevAnimes = JSON.parse(localStorage.getItem("animes")) || [];
        localStorage.setItem("animes", JSON.stringify([...prevAnimes, details]));

        alert("anime added Successfully" + details.seasons.length);

        router.push("/dashboard");
    }

    const handleChange = (e, type) => {
        let { name, value } = e.target;

        name == "name" &&
            setFormData({ ...formData, "name": value });

        name == "epi" && (async () => {
            let temp = singleSeason;

            type == "t"
                ? temp.totalEp = value
                : temp.watchedEp = value;

            temp.completed = (temp.totalEp == temp.watchedEp);

            await setSingleSeason(temp);

            console.log("temping :-> ", type, name, value, singleSeason);
        })();
    }

    const addSeason = () => {
        setSeasons([...seasons, {
            "totalEp": 0,
            "watchedEp": 0,
            "completed": false
        }]);

        setSeasonCount(seasonCount + 1);
    }

    const deleteSeason = () => {
        let temp = seasons;

        setSeasons(temp.pop());
        setSeasonCount(seasonCount - 1);
    }

    const updateSeason = (indexToReplace, type, value) => {
        let temp = seasons;
        let temp2 = temp[indexToReplace];

        // type "t" ho toh totalEp ki value set, varna watchedEp ki value set
        type == "t"
            ? temp2.totalEp = value
            : temp2.watchedEp = value;

        // agar watchedEp aur totalEp equal ho jaaye toh completed = true
        temp2.completed = (temp2.totalEp == temp2.watchedEp);

        temp[indexToReplace] = temp2;

        setSeasons(temp);
    }
    
    const close = () => setIsOpen(false);

    return (
        <div>
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 m-3 mr-0 mt-[14px] cursor-pointer" onClick={() => {
                    router.push("/dashboard");
                    setGlobalState({ ...globalState, "surfing": !globalState.surfing });
                }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

                <h1 className="text-3xl m-5 my-3">Add a new Anime</h1>
            </div>

            <hr />

            <div className="my-4 md:mx-20 mx-5">
                <form action={handleSubmit} className="w-full max-w-md px-4 h-[90%]">
                    <Field className="my-5">
                        <Label className="text-lg font-medium">Anime Name</Label>
                        <Input className={'mt-3 block w-full rounded-lg border-none bg-gray-500/10 py-1.5 px-3 text-base/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-500/25'} name="name" onChange={handleChange} />
                    </Field>

                    <Field className="my-5">
                        <Label className="text-lg font-medium">Has seasons?</Label>
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={"group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out mt-1 " + (enabled ? "bg-blue-600" : "bg-gray-400/30")}
                        >
                            <span
                                aria-hidden="true"
                                className={"pointer-events-none inline-block size-5 translate-x-0 rounded-full ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7 " + (enabled ? "bg-white" : "bg-gray-50")}
                            />
                        </Switch>
                    </Field>

                    {enabled
                        ? <>
                            {[new Array(seasonCount).fill()][0].map((i, ind) => {
                                return <Field className="my-5" key={ind}>
                                    <h2 className="text-lg font-medium">Number of Episodes in Season {ind + 1}</h2>

                                    <div className="flex my-2 flex-row gap-x-4">
                                        <div className="flex my-2 flex-col items-center">
                                            <Label className="text-base font-medium">Watched</Label>
                                            <Input className={'mt-3 block w-20 rounded-lg border-none bg-gray-500/5 py-1.5 px-3 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-500/25 text-center text-lg'} type="text" onChange={(e) => updateSeason(ind, "w", e.target.value)} />
                                        </div>

                                        <p className="text-4xl mt-[2.60rem] -ml-1">/</p>

                                        <div className="flex my-2 flex-col items-center">
                                            <Label className="text-base font-medium">Total</Label>
                                            <Input className={'mt-3 block w-20 rounded-lg border-none bg-gray-500/5 py-1.5 px-3 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-500/25 text-center text-lg'} type="text" onChange={(e) => updateSeason(ind, "t", e.target.value)} />
                                        </div>

                                        {ind == (seasonCount - 1) && ind != 0 &&
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 self-center mt-8 ml-2 cursor-pointer" onClick={deleteSeason}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        }
                                    </div>
                                </Field>
                            })}

                            <Button className="rounded-md bg-blue-600 px-2 pb-2 w-10 h-10 text-white data-[hover]:bg-blue-500 data-[active]:bg-blue-700 flex justify-center items-center mb-8 text-4xl" onClick={addSeason}>
                                +
                            </Button>
                        </>

                        : <>
                            <Field className="my-5">
                                <Label className="text-lg font-medium">Number of Episodes</Label>

                                <div className="flex my-2 flex-row gap-x-4">
                                    <div className="flex my-2 flex-col items-center">
                                        <Label className="text-base font-medium">Watched</Label>
                                        <Input className={'mt-3 block w-20 rounded-lg border-none bg-gray-500/5 py-1.5 px-3 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-500/25 text-center text-lg'} type="text" name="epi" onChange={(e) => handleChange(e, "w")} />
                                    </div>

                                    <p className="text-4xl mt-[2.60rem] -ml-1">/</p>

                                    <div className="flex my-2 flex-col items-center">
                                        <Label className="text-base font-medium">Total</Label>
                                        <Input className={'mt-3 block w-20 rounded-lg border-none bg-gray-500/5 py-1.5 px-3 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-500/25 text-center text-lg'} type="text" name="epi" onChange={(e) => handleChange(e, "t")} />
                                    </div>
                                </div>
                            </Field>
                        </>
                    }

                    <Button className="rounded-md bg-blue-600 p-2 py-1 text-white hover:bg-blue-500 active:bg-blue-700 block ml-auto" style={{ "fontSize": "20px" }} type="submit">
                        Add Anime
                    </Button>
                </form>
            </div>

            <AnimeAddedDialog isOpen={isOpen} onClose={close} />

            <ToastContainer />
        </div>
    )
}

export default Add;