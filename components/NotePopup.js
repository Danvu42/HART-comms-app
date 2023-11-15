import {StyleSheet, View, Pressable, Text, Modal} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';  
import FontAwesome from "@expo/vector-icons/FontAwesome"
import TextEditEntry from './TextEditEntry';

export default function NotePopup({onPress, visible}) {

    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="arrow-left" size={25} color="#FFF" style={styles.exitButton} onPress={onPress}/>
                    <Text style={styles.headerText}>Edit Row</Text>
                    <FontAwesome name="save" size={25} color="#FFF" style={styles.exitButton} onPress={onPress}/>
                </View>
                <View style={styles.bodyContainer}>
                    <TextEditEntry label="jc_dev_desc"/>
                    <TextEditEntry label="jc_category"/>
                    <TextEditEntry label="jc_notes"/>
                    <TextEditEntry label="jc_pass"/>
                    <TextEditEntry label="jc_note_date"/>
                    <TextEditEntry label="jc_ball_in_court"/>
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
    }

});