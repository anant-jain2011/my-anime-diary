"use client";

import ConfirmDialog from '@/app/components/ConfirmDialog';
import { Button, Field, Input, Label, } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Edit = () => {
    const [anime, setAnime] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [animeDeleteInfo, setAnimeDeleteInfo] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let animes = localStorage.getItem("animes") || [];
        let i = +location.hash.replace("#", "");

        setAnime(JSON.parse(animes).filter(n => !n.completed)[i]);
    }, []);


    const handleSubmit = (e) => {
        let prevAnimes = JSON.parse(localStorage.getItem("animes"));
        let i = +location.hash.replace("#", "");

        prevAnimes = prevAnimes.filter(n => !n.completed)

        prevAnimes[i] = anime;

        localStorage.setItem("animes", JSON.stringify(prevAnimes));

        toast.success('Your changes were saved.', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: "bounce",
        });

        router.push("/dashboard");
    };

    const addSeason = () => {
        let seasons = [...anime.seasons, {
            "totalEp": null,
            "watchedEp": null,
            "completed": false
        }];

        setAnime({
            ...anime,
            seasons,
            seasonCount: seasons.length
        });
    }

    const deleteSeason = () => {
        let temp = anime.seasons;

        temp.pop();

        setAnime({ // agar seasons hai toh ye kro
            ...anime,
            seasonCount: temp.length,
            seasons: temp,
        });
    }

    const updateSeason = (indexToReplace, type, value) => {
        let temp = anime.seasons;
        let animeCompleted = false;
        let temp2 = temp[indexToReplace];

        // type "t" ho toh totalEp ki value set, varna watchedEp ki value set
        type == "t"
            ? temp2.totalEp = value
            : temp2.watchedEp = value;

        // agar watchedEp aur totalEp equal ho jaaye toh completed = true
        temp2.completed = (temp2.totalEp == temp2.watchedEp);

        // agar saare seasons complete ho jaye toh anime.completed = true
        animeCompleted = temp.every(n => n.completed);

        temp[indexToReplace] = temp2;

        setAnime({ ...anime, seasons: temp, completed: animeCompleted });
    }

    const deleteAnime = (index) => {
        let prevAnimes = JSON.parse(localStorage.getItem("animes"));

        prevAnimes.splice(index, 1);

        localStorage.setItem("animes", JSON.stringify(prevAnimes));

        close();

        toast.success('Anime deleted Successfully!', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: "bounce",
        });

        router.push("/dashboard");
    }

    const close = () => setIsOpen(false);

    return (
        <>
            <div className="flex flex-col px-5 md:mx-80">
                {anime && anime.seasons.map((i, ind, arr) =>
                    <Field className="my-5" key={ind}>
                        <h2 className="text-lg font-medium">Number of Episodes in Season {ind + 1}</h2>

                        <div className="flex my-2 flex-row gap-x-4">
                            <div className="flex my-2 flex-col items-center">
                                <Label className="text-base font-medium">Watched</Label>
                                <Input className={'mt-3 block w-20 rounded-lg border-none bg-gray-500/5 py-1.5 px-3 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-500/25 text-center text-lg'} type="text" value={i.watchedEp} onChange={(e) => updateSeason(ind, "w", e.target.value)} />
                            </div>

                            <p className="text-4xl mt-[2.60rem] -ml-1">/</p>

                            <div className="flex my-2 flex-col items-center">
                                <Label className="text-base font-medium">Total</Label>
                                <Input className={'mt-3 block w-20 rounded-lg border-none bg-gray-500/5 py-1.5 px-3 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-500/25 text-center text-lg'} type="text" value={i.totalEp} onChange={(e) => updateSeason(ind, "t", e.target.value)} />
                            </div>

                            {ind == (arr.length - 1) && ind != 0 &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 self-center mt-8 ml-2 cursor-pointer" onClick={deleteSeason}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            }
                        </div>
                    </Field>
                )}

                <Button className="rounded-md bg-blue-600 px-2 pb-2 w-10 h-10 text-white data-[hover]:bg-blue-500 data-[active]:bg-blue-700 flex justify-center items-center mb-8 text-4xl" onClick={addSeason}>
                    +
                </Button>


                <Button className="rounded-md bg-blue-600 p-2 py-1 text-white hover:bg-blue-500 active:bg-blue-700 block ml-auto align-self-end" style={{ "fontSize": "20px" }} type="submit" onClick={handleSubmit}>
                    Save changes
                </Button>

                <Button className="rounded-md bg-red-600 w-full md:w-1/2 align-self-center mx-1 my-8 py-1 text-white hover:bg-red-500 active:bg-red-700 block sm:mx-auto mb-20" style={{ "fontSize": "22px" }} type="submit" onClick={() => {
                    setIsOpen(true);
                    let index = parseInt(location.hash.replace("#", ""));
                    setAnimeDeleteInfo({ name: anime.name, index });
                }}>
                    Delete Anime
                </Button>
            </div>

            <ConfirmDialog isOpen={isOpen} onClose={close} cancel={close} deleteAnime={() => deleteAnime(animeDeleteInfo.index)} animeName={animeDeleteInfo.name} />

            <ToastContainer />
        </>
    )
}

export default Edit;