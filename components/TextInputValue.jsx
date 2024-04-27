import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert } from 'react-native';

export const TextInputValue = ({ setAmount, onPress }) => {
    const [number, setNumber] = useState('');
    const [focused, setFocused] = useState(false);

    const handleInputChange = (text) => {
        // if (/^\d*\.?\d+$/.test(text) && parseFloat(text) > -1)  Alert.alert('Error', 'Número no valido');
        if (/^\d*\.?\d*$/.test(text)) {
            setNumber(text);
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
        handleSubmit(number);
    };

    const handleSubmit = (e) => {
        console.log(e);
        setAmount(number);
        onPress;
    };

    return (
        <TextInput
            value={number}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onSubmitEditing={handleSubmit}
            // onKeyPress={handleSubmit}
            // onPressOut={handleSubmit}
            keyboardType="numeric"
            placeholder="Ingrese un número mayor que cero"
            onChangeText={handleInputChange}
            style={[styles.currencyTextInput, focused && styles.inputFocused]}
        />
    )
}

const styles = StyleSheet.create({
    currencyTextInput: {
        height: 50,
        width: '100%',
        marginTop: 5,
        borderWidth: 2,
        marginBottom: 10,
        borderRadius: 15,
        borderColor: '#ccc',
        paddingHorizontal: 15
    },
    inputFocused: {
        borderColor: 'blue',
    },
});

