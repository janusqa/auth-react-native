import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';

export const setValue = async (key: string, value: string) => {
    try {
        await setItemAsync(key, value);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Saving to local storage failed.';
        throw new Error(message);
    }
};

export const getValue = async (key: string) => {
    try {
        const result = await getItemAsync(key);
        if (result) return result;
        else return null;
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Retrieving from local storage failed.';
        throw new Error(message);
    }
};

export const unsetValue = async (key: string) => {
    try {
        await deleteItemAsync(key);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Deleting from local storage failed.';
        throw new Error(message);
    }
};
