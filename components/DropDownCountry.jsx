import React, { useEffect, useState } from 'react';
import { images_of_flags } from '../constants/countries';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';

// https://www.flaticon.es/icono-gratis/bandera_12360459?related_id=12360459 bolivia


export const DropDownCountry = ({ data, countriesList, setCountriesList, setCurrency, setCurrencyValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const handleCountrySelect = (option) => {
        toggleDropDown();
        setCurrency(option.code);
        setSelectedCountry(option);
        setCurrencyValue(option.exchange);
    };

    const setExchangeValue = () => {
        if (data?.rates) {
            const setRatesCountries = countriesList.map((country, index) => {
                return {
                    code: country?.code,
                    flag: country?.flag,
                    name: country?.name,
                    country: country?.country,
                    convert: country?.convert,
                    exchange: data.rates[country?.code]
                }
            });
            setCountriesList(setRatesCountries);
        }
    }

    useEffect(() => {
        setExchangeValue();
    }, [data])

    return (
        <>
            <TouchableOpacity onPress={toggleDropDown} style={styles.button}>
                <View style={styles.containerDropDown}>
                    {selectedCountry?.name &&
                        <Image style={styles.selectLogo} source={images_of_flags[selectedCountry?.flag]} />
                    }
                    <Text>{selectedCountry?.name || 'Selecciona una divisa'}</Text>
                </View>
            </TouchableOpacity>
            <Modal
                visible={isOpen}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleDropDown}
                onPress={() => toggleDropDown()}
            >
                <SafeAreaView >
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                {countriesList.map((country, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.option}
                                        onPress={() => handleCountrySelect(country)}
                                    >
                                        <View style={styles.containerModal}>
                                            <Image style={styles.dropdownLogo} source={images_of_flags[country.flag]} />
                                            <View>
                                                <Text>{country?.name || 'Selecciona una divisa'}</Text>
                                                <Text style={styles.tinyText}>{country?.country}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        // width: Dimensions.get('window').width
    },
    tinyText: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    button: {
        height: 50,
        padding: 10,
        marginTop: 5,
        borderWidth: 2,
        marginBottom: 10,
        borderRadius: 15,
        borderColor: '#ccc',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    option: {
        padding: 10,
    },
    containerDropDown: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerModal: {
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        flexDirection: 'row',

    },
    dropdownLogo: {
        width: 35,
        height: 35,
        marginRight: 10
    },
    selectLogo: {
        width: 25,
        height: 25,
        marginRight: 10
    },
});