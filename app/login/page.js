"use client";

import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        /* Initialize the Google Identity Services library */
        window.google.accounts.id.initialize({
            client_id: '177372476854-mc25cjisdj951v258b5brd0kdioopt5s.apps.googleusercontent.com',
            callback: handleCredentialResponse,
        });

        /* Render the Google Sign-In button */
        window.google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            { theme: 'outline', size: 'large', width: 60, text: "Continue with Google" } // customization attributes
        );

        window.google.accounts.id.prompt();

        setIsLoggedIn(localStorage.getItem("profileObj") !== null ? "yes" : "no");
    }, []);

    // Handle the authenticated user
    const handleCredentialResponse = (response) => {
        const decodedToken = jwt.decode(response.credential);
        console.log(decodedToken);

        onSignIn(decodedToken);
    };

    const onSignIn = async (googleUser) => {
        let { name, given_name, picture, email } = googleUser;
        let profileObj = { name, given_name, picture, email };

        let res = await fetch("/api/signin", {
            "method": 'POST',
            "headers": {
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify(profileObj),
        });

        let resp = await res.json();

        localStorage.setItem("profileObj", JSON.stringify(profileObj));
    };

    return <>
        {(!isLoggedIn || isLoggedIn == "no") &&
            <div>
                <h2>Login</h2>
                <div id="google-signin-button" hidden={!isLoggedIn || isLoggedIn == "yes"}>
                </div>
            </div>
        }
        {(isLoggedIn == "yes") &&
            <div>
                Already Logged In
            </div>
        }
    </>;
};

export default Login;