"use client";

import React, { useEffect, useState, useRef } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';

const Login = () => {
    // const [loggedAsGuest, setLoggedAsGuest] = useState(false);
    const { globalState, setGlobalState } = useGlobalState();
    const ref = useRef();
    const router = useRouter();

    useEffect(() => {
        if (globalState.profileObj) {
            router.push("/dashboard");
        }

        /* Initialize the Google Identity Services library */
        window.google.accounts.id.initialize({
            client_id: '177372476854-mc25cjisdj951v258b5brd0kdioopt5s.apps.googleusercontent.com',
            callback: handleCredentialResponse,
        });

        /* Render the Google Sign-In button */
        window.google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            {
                type: 'icon',
                size: 'large',
                logo_alignment: 'left', // width in pixels
            } // customization attributes
        );

        window.google.accounts.id.prompt();
    }, []);

    // Handle the authenticated user
    const handleCredentialResponse = (response) => {
        const decodedToken = jwt.decode(response.credential);
        console.log(decodedToken);

        onSignIn(decodedToken);
    };

    const onSignIn = async (googleUser) => {
        let { name, given_name, picture } = googleUser;
        let profileObj = { name, first_name: given_name, picture, animes: [] };

        // let res = await fetch("/api/signin", {
        //     "method": 'POST',
        //     "headers": {
        //         'Content-Type': 'application/json'
        //     },
        //     "body": JSON.stringify(profileObj),
        // });

        // let resp = await res.json();

        localStorage.setItem("profileObj", JSON.stringify(profileObj));

        setGlobalState({ ...globalState, profileObj });

        toast.success("Logged In Successfully!", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: "bounce"
        });

        setTimeout(router.push("/dashboard"), 2000);
    };

    const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

    return <div className="min-h-screen flex flex-col items-center">
        {!globalState.profileObj
            ? <div className="place-self-center w-96 h-fit py-5 flex justify-center items-center flex-col gap-y-4 mx-auto my-20 sm:my-4 relative">
                <h2 className="text-4xl text-center mb-5">Login Using</h2>

                <div className="w-3/5 flex justify-evenly items-center rounded-lg px-2 bg-white border border-gray-300 cursor-pointer h-16 hover:scale-105 active:scale-95" onClick={() => location.href = githubLoginUrl}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-8 h-8 mr-2">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </svg>
                    <p className="text-lg">Sign Up With GitHub</p>
                </div>
            </div>
            : <div className="place-self-center">
                Already Logged In
            </div>
        }
        {/* {!loggedAsGuest && <>
            <p className="text-center mb-4">Or</p>

            <div className="w-3/5 flex mx-auto justify-evenly items-center rounded-lg px-2 bg-white border border-gray-300 cursor-pointer h-16 hover:scale-105 active:scale-95">
                <p className="text-lg">Continue as a guest</p>
            </div>
        </>} */}
    </div>;
};

export default Login;