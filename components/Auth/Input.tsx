import {
    View,
    Text,
    TextInput,
    StyleSheet,
    type KeyboardTypeOptions,
} from 'react-native';

import { Colors } from '../../constants/styles';

type Props = {
    label: string;
    keyboardType?: KeyboardTypeOptions;
    secure?: boolean;
    onUpdateValue: (enteredValue: string) => void;
    value: string;
    isInvalid: boolean;
};

const Input = ({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid,
}: Props) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>
            <TextInput
                style={[styles.input, isInvalid && styles.inputInvalid]}
                autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        color: 'white',
        marginBottom: 4,
    },
    labelInvalid: {
        color: Colors.error500,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        fontSize: 16,
    },
    inputInvalid: {
        backgroundColor: Colors.error100,
    },
});
