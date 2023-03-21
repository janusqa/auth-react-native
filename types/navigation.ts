// import type {
//     CompositeScreenProps,
//     NavigatorScreenParams,
// } from '@react-navigation/native';
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthNativeStackParamList = {
    Login: undefined;
    Signup: undefined;
};

export type AuthNativeStackScreenProps<
    T extends keyof AuthNativeStackParamList
> = NativeStackScreenProps<AuthNativeStackParamList, T>;

export type AuthenticatedNativeStackParamList = {
    Welcome: undefined;
};

export type AuthenticatedNativeStackScreenProps<
    T extends keyof AuthenticatedNativeStackParamList
> = NativeStackScreenProps<AuthenticatedNativeStackParamList, T>;

// declare global {
//     namespace ReactNavigation {
//         interface RootParamList extends AuthNativeStackParamList {}
//     }
// }
