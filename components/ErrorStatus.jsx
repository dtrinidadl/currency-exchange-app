import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

export const ErrorStatus = ({ data, status, message, description }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorStatus}>{status}</Text>
            <Text style={styles.errorMessage}>{message}</Text>
            <Text style={styles.errorDescription}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorStatus: {
        fontSize: 65,
        color: 'red',
        marginBottom: 15,
        fontWeight: 'bold',
    },
    errorMessage: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    errorDescription: {
        fontSize: 13,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
});