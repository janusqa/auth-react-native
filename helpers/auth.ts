import { AUTHURL, WEBAPIKEY } from '@env';

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
    const response = await fetch(`${AUTHURL}:${mode}?key=${WEBAPIKEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
    });

    if (!response.ok) {
        throw new Error('Authentication failed! Please try again later');
    }

    const data =
        mode === 'signUp'
            ? ((await response.json()) as SignUpResponse)
            : ((await response.json()) as SignInResponse);

    return data;
};
