import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';
import initilizeStore from './store/configureStore';
import { useAppSelector, useAppDispatch } from './store/hooks/useStore';
import { getAuthStatus, setToken } from './store/auth';
import { unsetValue, getValue } from './helpers/secureStorage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import IconButton from './components/ui/IconButton';
import { useEffect, useCallback, useState } from 'react';

import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

void preventAutoHideAsync()
    .then((result) =>
        console.log(
            `SplashScreen.preventAutoHideAsync() succeeded: ${String(result)}`
        )
    )
    .catch(console.warn);

const store = initilizeStore();

export type AuthNativeStackParamList = {
    Login: undefined;
    Signup: undefined;
};

export type AuthenticatedNativeStackParamList = {
    Welcome: undefined;
};

const Stack = createNativeStackNavigator<
    AuthNativeStackParamList & AuthenticatedNativeStackParamList
>();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
};

const AuthenticatedStack = () => {
    const dispatch = useAppDispatch();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerRight: ({ tintColor }) => (
                        <IconButton
                            icon="exit"
                            color={tintColor ?? '#fff'}
                            size={24}
                            onPress={() => {
                                dispatch(setToken({ token: null }));
                                void unsetValue('token');
                            }}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const Navigation = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(getAuthStatus);
    const [appIsReady, setIsappIsReady] = useState<boolean>(false);

    useEffect(
        function () {
            const getToken = async () => {
                const token = await getValue('token');
                if (token)
                    dispatch(setToken({ token: JSON.parse(token) as string }));
                setIsappIsReady(true);
            };

            void getToken();
        },
        [dispatch]
    );

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) await hideAsync();
    }, [appIsReady]);

    if (!appIsReady) return null;

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <>
            <StatusBar style="light" />
            <Provider store={store}>
                <Navigation />
            </Provider>
        </>
    );
};

export default App;
