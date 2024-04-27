import React, { useEffect, useState } from 'react';
import { images_of_flags } from '../constants/countries'; // countries
import { StyleSheet, View, ActivityIndicator, Text, Image } from 'react-native';


export const ListConvertExchange = ({ countriesList, currencyCode, loading }) => {
    return (
        <>
            {loading && (<ActivityIndicator size="large" color="#00ff00" />)}
            {countriesList.map((country, index) => (
                <View key={index + country.code}>
                    {currencyCode != country.code ? (
                        <View style={styles.containerList}>
                            <View style={styles.containerCountry}>
                                <Image style={styles.flagImage} source={images_of_flags[country.flag]} />
                                <Text style={styles.tinyText} >{country?.code + ' '}</Text>
                            </View>
                            <Text style={styles.exchangeText}>
                                {country?.convert != '' ? parseFloat(country?.convert).toLocaleString() : '-'}
                            </Text>
                        </View>
                    ) : ('')}
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    tinyText: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    exchangeText: {
        flex: 1,
        fontSize: 25,
        marginLeft: 15,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    containerList: {
        marginTop: 15,
        marginBottom: 5,
        paddingBottom: 5,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        alignItems: 'center', //'baseline'
        flexDirection: 'row',
    },
    containerCountry: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flagImage: {
        width: 30,
        height: 30,
    }
});