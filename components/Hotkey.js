import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function Hotkey({ hotKey, hotKeyPress}) {
    return (
        <Pressable style={styles.hotKeyButton} onPress={() => {hotKeyPress("jc_notes", hotKey)}}>
            <Text style={styles.hotKeyButtonText}>{hotKey}</Text>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    hotKeyButton: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hotKeyButtonText: {
        color: '#0E0E0E',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Montserrat_800ExtraBold',
        whiteSpace: 'nowrap',
    }
});
