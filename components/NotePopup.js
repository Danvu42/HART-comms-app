import {StyleSheet, View, Pressable, Text, Modal} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';  
import FontAwesome from "@expo/vector-icons/FontAwesome"
import TextEditEntry from './TextEditEntry';

export default function NotePopup({onPress, visible, data, noteIndex, saveCsv}) {
    if (!data) {
        data = [];
    }
    class saveTextLocation {
        constructor(label, text) {
            this.label = label;
            this.text = text;
            this.index = noteIndex;
        }
    }
    let textLocations = [];

    const sendText = (label, text) => {
        textLocations.push(new saveTextLocation(label, text));
    };

    let textEditEntries = ["csc_device_desc", "jc_categories", "jc_notes", "jc_pass", "jc_note_date", "jc_ball_in_court"];
    let multilineOptions = [true, false, true, false, false, false]
    let totalTextEntries = [];
    for (let i = 0; i < textEditEntries.length; i++) {
        totalTextEntries.push(
            <TextEditEntry label={textEditEntries[i]} textPlaceholder={data[textEditEntries[i]]} sendText={sendText} multiline={multilineOptions[i]} key={i}/>
        )
    }
    return (
        <Modal
            transparent={false}
            visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="arrow-left" size={25} color="#FFF" style={styles.exitButton} onPress={onPress}/>
                    <Text style={styles.headerText}>Edit Ref {data.ref_no}</Text>
                    <FontAwesome name="save" size={25} color="#FFF" style={styles.exitButton} onPress={() => saveCsv(textLocations, "replace")}/>
                </View>
                <View style={styles.bodyContainer}>
                    {totalTextEntries}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modalContainer: {
        flex:1,
        backgroundColor: '#0E0E0E',
        width:'100%',

    },
    headerContainer: {
        display:'flex',
        flexDirection:'row',
        textAlign:'center',
        justifyContent: 'space-between',
        padding:20,
    },
    headerText: {
        display:'flex',
        flexDirection:'row',
        justifyContent: 'center',
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Montserrat_800ExtraBold',
    },
    exitButton: {
        display:'flex',
        alignItems: 'center',
    },
    bodyContainer: {
        height:'80%',
        margin:15,
    },

});