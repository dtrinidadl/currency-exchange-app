import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const ButtonConvert = ({ onPress, title, disabled, currencyCode, amount }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.button, disabled && styles.disabledButton]}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        marginTop: 10,
        borderWidth: 2,
        marginBottom: 40,
        borderRadius: 15,
        alignItems: 'center',
        borderColor: '#06DFF9',
        backgroundColor: '#007bff',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    disabledButton: {
        opacity: 0.5,
    },
});
