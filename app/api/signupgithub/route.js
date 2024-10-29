// pages/api/auth/callback/github.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
        return res.status(400).send('Authorization code is missing');
    }

    try {
        const response = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        const { access_token } = response.data;

        // Fetch user data from GitHub API
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const user = await userResponse.data;

        // Store user data in session or database as needed
        // For simplicity, we'll just return the user data in the response
        return new Response(JSON.stringify({ user }));

    } catch (error) {
        return new Response(JSON.stringify({ "error": 'Error exchanging authorization code for access token' }));
    }
}