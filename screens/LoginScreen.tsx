import AuthContent from '../components/Auth/AuthContent';

import { authenticate } from '../helpers/auth';
import { useState } from 'react';
import { Alert } from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';

import { useAppDispatch } from '../store/hooks/useStore';
import { setToken } from '../store/auth';

import { AuthNativeStackScreenProps } from '../types/navigation';

export type Props = AuthNativeStackScreenProps<'Login'>;

const LoginScreen = () => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const signInHandler = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        try {
            setLoading(true);
            const { idToken } = await authenticate(
                'signInWithPassword',
                email,
                password
            );
            dispatch(setToken({ token: idToken }));
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Something went wrong';
            Alert.alert('Operation failed', message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingOverlay message="Signing user in..." />;

    return <AuthContent isLogin={true} onAuthenticate={signInHandler} />;
};

export default LoginScreen;
