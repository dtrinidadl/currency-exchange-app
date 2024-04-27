import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ErrorStatus } from './components/ErrorStatus';
import { ButtonConvert } from './components/ButtonConvert';
import { TextInputValue } from './components/TextInputValue';
import { DropDownCountry } from './components/DropDownCountry';
import { errorAPI, getLatestCurrencyExchange } from './helpers/service/fetch';
import { ListConvertExchange } from './components/ListConvertExchange';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView, ActivityIndicator, Text, View, Image } from 'react-native'; //Dimensions, Appearance

import { dataTest } from './constants/dataTest';
import { countries } from './constants/countries';

// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const logoDark = require('./assets/logotipo-darkmode.png');
const logoLight = require('./assets/logotipo-lightmode.png');

export default function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [amount, setAmount] = useState('');
  const [logotipo, setLogotipo] = useState(logoLight);
  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyValue, setCurrencyValue] = useState('');
  const [countriesList, setCountriesList] = useState(countries);

  // const getCurrencyExchange = async () => {
  //   // setLoading(true);
  //   // const request = await getLatestCurrencyExchange();
  //   // setData(request);
  //   // setLoading(false);
  //   await setData(dataTest);
  // };

  const getCurrencyExchange = async () => {
    //*
    setLoading(true);
    // await AsyncStorage.clear();
    try {
      const today = new Date();
      const dueDate = await AsyncStorage.getItem('@dueDate');

      if (dueDate === null || (Number(dueDate) < today.getTime())) {
        const newDueDate = (today.getTime() + 86400000).toString();
        const request = await getLatestCurrencyExchange();
        await setData(request);
        await AsyncStorage.setItem('@dueDate', newDueDate);
        // await AsyncStorage.setItem('@myDataRequest', JSON.toString(request));

      } else {
        const getDataStorage = await AsyncStorage.getItem('@myDataRequest');
        if (getDataStorage !== null) {
          const parseDataStorage = JSON.parse(getDataStorage);
          await setData(parseDataStorage);
        }
      }
      setLoading(false);
    } catch (error) {
      setData(errorAPI);
      setLoading(false);
      console.error(error);
    }
    //*/
  };

  useEffect(() => {
    getCurrencyExchange();
  }, [])

  useEffect(() => {
    if (amount != '' && currencyCode != '') setDisabled(false);
  }, [amount, currencyCode])

  const onPressHandler = (e) => {
    console.log('dio enter');
    setLoading(true);
    setDisabled(true);
    const baseExchange = parseFloat(amount) / currencyValue;
    const countriesListAux = [...countriesList];
    countriesListAux.map((country, index) => {
      const exchange = baseExchange * country.exchange;
      country.convert = exchange.toFixed(2);
    });
    setCountriesList(countriesListAux);
    setLoading(false);
    setDisabled(false);
  };

  return (
    <View style={[styles.container, styles.loadingContainer]}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View>
          {data?.error ? (
            <ErrorStatus
              data={data}
              status={data?.status}
              message={data?.message}
              description={data?.description}
            />
          ) : (
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>
                  <Image source={logotipo} style={styles.logotipo} />


                  {/* <Text style={styles.tinyText}>dueData: {dueDateGet}  Today: </Text> */}


                  <Text style={styles.tinyText}>Divisa</Text>
                  <DropDownCountry
                    data={data}
                    countriesList={countriesList}
                    setCurrency={setCurrencyCode}
                    setCountriesList={setCountriesList}
                    setCurrencyValue={setCurrencyValue}
                  />
                  <Text style={styles.tinyText}>Monto</Text>
                  <TextInputValue setAmount={setAmount} onPress={onPressHandler}/>
                  <ButtonConvert disabled={disabled} onPress={onPressHandler} title="Convertir" currencyCode={currencyCode} amount={amount} />
                  <ListConvertExchange countriesList={countriesList} currencyCode={currencyCode} loading={loading} />
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal: 30,
    // marginHorizontal: 50,
    // width: Dimensions.get('window').width,
  },
  logotipo: {
    height: 31,
    marginTop: 25,
    marginBottom: 25,
    width: Dimensions.get('window').width - 108
    // aspectRatio: 1
    // width: screenWidth * 0.001,
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    color: '#4AC017',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  tinyText: {
    fontSize: 10,
    fontWeight: 'bold'
  },
});
