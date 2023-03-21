import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

export type AuthInfo = {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
};

type Props = {
    isLogin: boolean;
    onSubmit: (credentials: AuthInfo) => void;
    credentialsInvalid: {
        email: boolean;
        confirmEmail: boolean;
        password: boolean;
        confirmPassword: boolean;
    };
};

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: Props) {
    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState<string>('');
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] =
        useState<string>('');

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    function updateInputValueHandler(
        inputType: keyof AuthInfo,
        enteredValue: string
    ) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
        });
    }

    return (
        <View>
            <View>
                <Input
                    label="Email Address"
                    onUpdateValue={(enteredValue) =>
                        updateInputValueHandler('email', enteredValue)
                    }
                    value={enteredEmail}
                    keyboardType="email-address"
                    isInvalid={emailIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Email Address"
                        onUpdateValue={(enteredValue) =>
                            updateInputValueHandler(
                                'confirmEmail',
                                enteredValue
                            )
                        }
                        value={enteredConfirmEmail}
                        keyboardType="email-address"
                        isInvalid={emailsDontMatch}
                    />
                )}
                <Input
                    label="Password"
                    onUpdateValue={(enteredValue) =>
                        updateInputValueHandler('password', enteredValue)
                    }
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Password"
                        onUpdateValue={(enteredValue) =>
                            updateInputValueHandler(
                                'confirmPassword',
                                enteredValue
                            )
                        }
                        secure
                        value={enteredConfirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default AuthForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
});
