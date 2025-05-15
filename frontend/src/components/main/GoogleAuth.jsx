import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const GoogleAuthButton = ({ onConnected }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [searchParams] = useSearchParams();

    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/analytics.readonly&access_type=offline&prompt=consent`.replace(/\s+/g, '');

    const exchangeCodeForToken = async (code) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/callback?code=${code}`);
            const { token, googleAccessToken } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                if (googleAccessToken) {
                    localStorage.setItem('googleAccessToken', googleAccessToken);
                }
                setIsConnected(true);
                if (onConnected) onConnected();
            } else {
                console.warn('No token received');
            }
        } catch (error) {
            console.error('OAuth error:', error);
        }
    };

    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            exchangeCodeForToken(code);
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center">
            {!isConnected ? (
                <a
                    href={GOOGLE_AUTH_URL}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Connect Google Analytics
                </a>
            ) : (
                <p className="text-green-600">Connected to Google Analytics</p>
            )}
        </div>
    );
};

export { GoogleAuthButton };
