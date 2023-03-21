import { authUrl, webApiKey } from '../constants/env';

type SignUpResponse = {
    email: string;
    expiresIn: string;
    idToken: string;
    localId: string;
    refreshToken: string;
};

interface SignInResponse extends SignUpResponse {
    displayName: string;
    registered: boolean;
}

export const authenticate = async (
    mode: 'signUp' | 'signInWithPassword',
    email: string,
    password: string
) => {
    const response = await fetch(`${authUrl}:${mode}?key=${webApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error('Authentication failed! Please try again later');
    }

    return mode === 'signUp'
        ? (data as SignUpResponse)
        : (data as SignInResponse);
};
