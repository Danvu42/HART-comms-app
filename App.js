import { Platform, StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';

import ContentCom from './components/contentCom.js';
import HotkeyModal from './components/HotkeyModal.js';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { readRemoteFile } from 'react-native-csv';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import NotePopup from './components/NotePopup.js';
import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * The main component of the commsApp.
 * @returns {JSX.Element} The JSX element of the commsApp.
 */
export default function commsApp() {
  const [csvData, setCsvData] = useState(null);
  const [noteIndex, setNoteIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const initialCheckboxStates = new Array(200).fill(false);
  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);

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
  const pickDocumentAsync = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory:true,
    });

    result = result.assets[0].uri;
    if (Platform.OS === 'android') {
      result = await FileSystem.readAsStringAsync(result, {
        encoding: 'base64',
      });
      result = 'data:text/csv;base64,' + result;
    }


    readRemoteFile(result, {
      complete: (results) => {
        console.log(results);
        if (results && results.data) {
          setCsvData(results.data);
        } else {
          console.error('Failed to read CSV file');
        }
      },
      header: true,
      delimiter: ',',
    });
  };

  const noteClick = (index) => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      setNoteIndex(index);
    }
  };

  const selectCheckBox = (index, checkboxState) => {
    if (checkboxState) {
      setSelectedNotes(selectedNotes.filter((note) => note != index));
    } else {
      setSelectedNotes([...selectedNotes, index]);
    }
  };

  const clearCheckBox = () => {
    setSelectedNotes([]);
    setCheckboxStates(initialCheckboxStates);
  };



  const saveCsv = (textLocations, option) => {
    const updatedCsvData = [...csvData]; // Create a new array and copy the existing data
    let newLabel = null;
    for (let i = 0; i < textLocations.length; i++) {
      const { index, label, text } = textLocations[i];
      if (option == "replace") {
        newLabel = text;
      } else if (option == "add") {
        newLabel = updatedCsvData[index][label] + ' ' + text + ';';
      } else if (option == "del") {
        newLabel = updatedCsvData[index][label].replace(' ' + text + ';', '');
      }
      updatedCsvData[index] = {
        ...updatedCsvData[index], // Copy the existing object
        [label]: newLabel, // Update the specific label with the new text
      };
    }

    setCsvData(updatedCsvData); // Update the state with the new array

    if (modalVisible) {
      setModalVisible(!modalVisible);
    }
    textLocations = [];
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.titleText}>HART COMMS INSPECTION</Text>
            <FontAwesome name={"upload"} size={25} color="#FFF" onPress={pickDocumentAsync} />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelText}>Ref #</Text>
            <Text style={[styles.labelText, { width: '60%' }]}>Notes</Text>
            <Pressable style={{ width: '20%' }} onPress={clearCheckBox}>
              <Text style={styles.labelText}>CLR</Text>
            </Pressable>
          </View>
        </View>
        {csvData ? (
          <NotePopup onPress={noteClick} visible={modalVisible} data={csvData[noteIndex]} noteIndex={noteIndex} saveCsv={saveCsv} />
        ) : (
          <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, zIndex: -4 }}>Please Import a CSV file!</Text>
        )}
        <ScrollView style={styles.content} scrollEnabled={!modalVisible}>

          {csvData ? (
            <ContentCom dataBig={csvData} onPress={noteClick} selectCheckBox={selectCheckBox} checkboxStates={checkboxStates} setCheckboxStates={setCheckboxStates} />
          ) : (
            <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, zIndex: -4 }}>Please Import a CSV file!</Text>
          )}

        </ScrollView>
        <HotkeyModal saveCsv={saveCsv} indices={selectedNotes} />
      </View>

    </>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0E0E0E',
    flex: 1,
  },

  header: {
    position: 'fixed',
    width: '100%',
    zIndex: 10,
    backgroundColor: '#0E0E0E',
  },

  title: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25292e',
    fontFamily: 'Montserrat_800ExtraBold',
    color: '#FFF',
  },

  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },
  labelText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    top: 130,
    backgroundColor: '#0E0E0E',
    overflow: 'hidden',
  },
};
/*
References:
https://github.com/Bunlong/react-papaparse#-csvreader
https://react-papaparse.js.org/docs#local-files


*/
