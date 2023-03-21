import AuthContent from '../components/Auth/AuthContent';

import { authenticate } from '../helpers/auth';
import { useState } from 'react';
import { Alert } from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';

import { useAppDispatch } from '../store/hooks/useStore';
import { setToken } from '../store/auth';

import { AuthNativeStackScreenProps } from '../types/navigation';

export type Props = AuthNativeStackScreenProps<'Signup'>;

const SignupScreen = () => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const signUpHandler = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        try {
            setLoading(true);
            const { idToken } = await authenticate('signUp', email, password);
            dispatch(setToken({ token: idToken }));
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Something went wrong';
            Alert.alert('Operation failed', message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingOverlay message="Creating user..." />;

    return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />;
};

export default SignupScreen;
