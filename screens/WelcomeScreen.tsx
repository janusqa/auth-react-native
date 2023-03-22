import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks/useStore';
import { getToken } from '../store/auth';

import type { AuthenticatedNativeStackScreenProps } from '../navigation';

export type Props = AuthenticatedNativeStackScreenProps<'Welcome'>;

const WelcomeScreen = () => {
    const [message, setMessage] = useState<string>('');
    const token = useAppSelector(getToken);

    useEffect(
        function () {
            const getMessage = async () => {
                if (token) {
                    const response = await fetch(
                        `https://next-js-1-35f4c-default-rtdb.firebaseio.com/message.json?auth=${token}`,
                        {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        }
                    );

                    const data = (await response.json()) as string;

                    if (response.ok) {
                        // throw new Error('Unable to fetch data');
                        setMessage(data);
                    }
                }
            };
            void getMessage();
        },
        [token]
    );

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
            {message && <Text>{message}</Text>}
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
