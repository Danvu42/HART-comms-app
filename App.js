import { StyleSheet, View, Pressable, Text } from 'react-native';
import { ScrollView } from 'react-native';
import {useState} from 'react';

import Button from './components/Button.js';
import ImgButton from './components/imgButton.js'
import ContentCom from './components/contentCom.js';
import * as DocumentPicker from 'expo-document-picker';
import { readRemoteFile } from 'react-native-csv';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';  

/**
 * The main component of the commsApp.
 * @returns {JSX.Element} The JSX element of the commsApp.
 */
export default function commsApp() {
  const [csvData, setCsvData] = useState(null);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  /**
   * A function that allows the user to pick a CSV document from their device.
   * @returns {Promise<void>} A promise that resolves when the user has picked a document.
   */
  const pickDocumentAsync = async() => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'text/csv'
    });
    readRemoteFile(result.assets[0].uri,{
      complete: (results) => {
        setCsvData(results.data);
      },
      header: true,
      delimiter: ',',
    })
  };

  return (
    <>
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.titleText}>HART COMMS INSPECTION</Text>
          <ImgButton label='Upload CSV' onPress={pickDocumentAsync} imgName='upload' size={25}/>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>Ref #</Text>
          <Text style={[styles.labelText, {width:'70%'}]}>Notes</Text>
          <Text style={styles.labelText}>SEL</Text>
        </View>
      </View>

        <ScrollView style={styles.content}>
          
          {csvData ? (
            <ContentCom dataBig={csvData}/>
          ) : (
            <Text style={{color:'#FFF', textAlign: 'center', padding:10, zIndex: -4}}>Please Import a CSV file!</Text>
          )}
          
        </ScrollView>
    </View>

  </>
  );
}

const styles = {
  container: {
    width:'100%',
    height:'100%',
    backgroundColor: '#0E0E0E',
    flex: 1,
  },

  header: {
    position: 'fixed',
    width: '100%',
    zIndex:10,
    backgroundColor: '#0E0E0E',
  },

  title: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:50,
    paddingRight:50,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25292e',
    fontFamily: 'Montserrat_800ExtraBold',
    whiteSpace: 'nowrap',
    color:'#FFF',
  },

  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:50,
    paddingRight:50,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },
  labelText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold', 
    width:'20%',
    textAlign:'center',
  },
  content: {
    flex: 1,
    top:130,
  },
};
/*
References:
https://github.com/Bunlong/react-papaparse#-csvreader
https://react-papaparse.js.org/docs#local-files


*/
