
import { StyleSheet, View, Pressable, Text, Modal } from 'react-native';
import {useState} from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Hotkey from './Hotkey.js';

export default function HotKeyModal({ saveCsv, indices }) {
    const [hotKeyVisible, setHotKeyVisible] = useState(false);
    class saveTextLocation {
        constructor(label, text, index) {
            this.label = label;
            this.text = text;
            this.index = index;
        }
    }
    let textLocations = [];

    const hotKeyPress = (label, text) => {
        if (indices.length == 0) {
            return;
        }
        for (let i = 0; i < indices.length; i++) {
            textLocations.push(new saveTextLocation(label, text, indices[i]));
        }
        console.log(textLocations);
        saveCsv(textLocations);
    };

    let hotKeyArray = ["good", "cable pulled", "cable not pulled", "device installed", "device not installed", "device not labeled", "device labeled", "not installed"];
    let totalHotkeyReturn = [];

    for (let i = 0; i < hotKeyArray.length; i++) {
        totalHotkeyReturn.push(
            <Hotkey hotKey={hotKeyArray[i]} hotKeyPress={hotKeyPress} />
        );
    }

    return (

        <View style={styles.modalContainer}>
            <Pressable style={styles.hotKeyClosed} onPress={() => {
                setHotKeyVisible(!hotKeyVisible);
            }}>
                <Text style={styles.hotKeyClosedText}>Hot Keys</Text>
            </Pressable>

            <Modal
                animationType="none"
                transparent={true}
                visible={hotKeyVisible}
            >
                <View style={styles.hotKeyOpen}>
                    <Pressable onPress={() => { setHotKeyVisible(!hotKeyVisible) }}>
                        <Text style={styles.hotKeyOpenText}>Hot Keys</Text>
                    </Pressable>
                    <View style={styles.hotKeyButtonContainer}>
                        {totalHotkeyReturn}
                    </View>
                </View>
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    hotKeyClosed: {
        display: 'flex',
        height: 50,
        backgroundColor: '#FFF',
        position: 'fixed',
        zIndex: 10,
        bottom: 0,
        width: '100%',
        borderTopWidth: 4,
        borderTopColor: '#0E0E0E',
    },
    hotKeyOpen: {
        display: 'flex',
        position: 'fixed',
        backgroundColor: '#0E0E0E',
        zIndex: 20,
        width: '100%',
        height: '40%',
        bottom: 0,
        borderTopWidth: 4,
        borderTopColor: '#FFF',

    },
    hotKeyOpenText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Montserrat_800ExtraBold',
        top: 0,
        margin: 15,
    },
    hotKeyClosedText: {
        color: '#0E0E0E',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontFamily: 'Montserrat_800ExtraBold',
    },
    hotKeyButtonContainer: {
        display: 'flex',
        gap: 15,
        alignItems: 'center',
        flexFlow: 'row wrap',
        width: '100%',
        justifyContent: 'center',
    },
});