import { Platform, StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import {useState} from 'react';

import Button from './components/Button.js';
import ImgButton from './components/imgButton.js'
import ContentCom from './components/contentCom.js';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { readRemoteFile } from 'react-native-csv';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';  
import NotePopup from './components/NotePopup.js';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Modal } from 'react-native-web';

/**
 * The main component of the commsApp.
 * @returns {JSX.Element} The JSX element of the commsApp.
 */
export default function commsApp() {
  const [csvData, setCsvData] = useState(null);
  const [noteIndex, setNoteIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [hotKeyVisible, setHotKeyVisible] = useState(false);

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
      type: '*/*',
    });

    // Grabbing the csv file will be different for android and web
    const uri = FileSystem.cacheDirectory + result.name;
    if (Platform.OS === 'android') {
      await FileSystem.copyAsync({
        from: result.uri,
        to: uri,
      })
      result = uri;
    }

    // Web will grab the file as a data uri, not using the file system
    readRemoteFile(result.assets[0].uri,{
      complete: (results) => {
        setCsvData(results.data);
      },
      header: true,
      delimiter: ',',
    })
  };

  const noteClick = (index) => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      setNoteIndex(index);
    }
    console.log(modalVisible);
  };

  const saveCsv = (textLocations) => {
    let tempCsvData = csvData;
    for (let i = 0; i < textLocations.length; i++) {  
      tempCsvData[textLocations[i].index][textLocations[i].label] = textLocations[i].text;
    }
    setCsvData(tempCsvData);
    setModalVisible(!modalVisible);
    textLocations = [];
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.titleText}>HART COMMS INSPECTION</Text>
            <FontAwesome name={"upload"} size={25} color="#FFF" onPress={pickDocumentAsync}/>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>Ref #</Text>
          <Text style={[styles.labelText, {width:'70%'}]}>Notes</Text>
          <Text style={styles.labelText}>SEL</Text>
        </View>
      </View>
        {csvData ? (
            <NotePopup onPress={noteClick} visible={modalVisible} data={csvData[noteIndex]} noteIndex={noteIndex} saveCsv={saveCsv}/>
          ) : (
            <Text style={{color:'#FFF', textAlign: 'center', padding:10, zIndex: -4}}>Please Import a CSV file!</Text>
          )}
        <ScrollView style={styles.content} scrollEnabled={!modalVisible}>

          {csvData ? (
            <ContentCom dataBig={csvData} onPress={noteClick}/>
          ) : (
            <Text style={{color:'#FFF', textAlign: 'center', padding:10, zIndex: -4}}>Please Import a CSV file!</Text>
          )}
          
        </ScrollView>

        <Pressable style={styles.hotKeyClosed} onPress={() => {
          
          setHotKeyVisible(!hotKeyVisible);
          console.log(hotKeyVisible); 
          }}>
          <Text style={styles.hotKeyClosedText}>Hot Keys</Text>
        </Pressable>

        <Modal
          animationType="none"
          transparent={true}
          visible={hotKeyVisible} 
        >
          <View style={styles.hotKeyOpen}>
            <Pressable onPress={() => setHotKeyVisible(!hotKeyVisible)}>
              <Text style={styles.hotKeyOpenText}>Hot Keys</Text>
            </Pressable>
            <View style={styles.hotKeyButtonContainer}>
              <Pressable style={styles.hotKeyButton}>
                <Text style={styles.hotKeyButtonText}>Test Add 1</Text>
              </Pressable>
              <Pressable style={styles.hotKeyButton}>
                <Text style={styles.hotKeyButtonText}>Test Add 2</Text>
              </Pressable>
              <Pressable style={styles.hotKeyButton}>
                <Text style={styles.hotKeyButtonText}>Test Add 3</Text>
              </Pressable>
              <Pressable style={styles.hotKeyButton}>
                <Text style={styles.hotKeyButtonText}>Test Add 4</Text>
              </Pressable>
              <Pressable style={styles.hotKeyButton}>
                <Text style={styles.hotKeyButtonText}>Test Add 5</Text>
              </Pressable>
              <Pressable style={styles.hotKeyButton}>
                <Text style={styles.hotKeyButtonText}>Test Add 6</Text>
              </Pressable>
            </View>
          </View>
      </Modal>

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
    paddingLeft:30,
    paddingRight:30,
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
    backgroundColor: '#0E0E0E',
    overflow: 'hidden',
  },
  hotKeyClosed: {
    display:'flex',
    height: 50,
    backgroundColor: '#FFF',
    position:'fixed',
    zIndex: 10,
    bottom:0,
    width:'100%',
    borderTopWidth: 4,
    borderTopColor: '#0E0E0E',
  },
  hotKeyOpen: {
    display:'flex',
    position:'fixed',
    backgroundColor: '#0E0E0E',
    zIndex: 20,
    width:'100%',
    height:'40%',
    bottom:0,
    borderTopWidth: 4,
    borderTopColor: '#FFF',

  },
  hotKeyOpenText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat_800ExtraBold',
    top: 0,
    margin:15,
  },
  hotKeyClosedText: {
    color: '#0E0E0E',
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 18,
    fontFamily: 'Montserrat_800ExtraBold',
  },
  hotKeyButtonContainer: {
      display:'flex',
      gap:15,
      alignItems: 'center',
      padding:15,
      flexFlow:'row wrap',
      width:'100%',
      justifyContent:'center',
  },
  hotKeyButton: {
      backgroundColor: '#FFF',
      padding:10,
      borderRadius: 5,
      display:'flex',
      height:60,
      alignItems: 'center',
      justifyContent: 'center',
  },
  hotKeyButtonText: {
      color: '#0E0E0E',
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'Montserrat_800ExtraBold',
      whiteSpace: 'nowrap',
  }
};
/*
References:
https://github.com/Bunlong/react-papaparse#-csvreader
https://react-papaparse.js.org/docs#local-files


*/
