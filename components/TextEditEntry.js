import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useState } from 'react';

export default function TextEditEntry({ label, textPlaceholder, sendText, multiline }) {
    const [text, onChangeText] = useState(textPlaceholder);
    let textHeight = 30;
    if (multiline) {
        textHeight = 100;
    } else {
        textHeight = 30;
    }
return (
    <View style={styles.textEditContainer}>
        <Text style={styles.textEditLabel}>{label}:</Text>
        <TextInput style={[styles.textEditInput, {height: textHeight}]} 
        onChangeText={onChangeText}
        value={text}
        multiline={multiline}
        onSubmitEditing={() => sendText(label, text)} 
        onSelectionChange={() => sendText(label, text)}
        />
    </View>
);

}

const styles = StyleSheet.create({
    textEditContainer: {
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    textEditLabel: {
        fontFamily:'Montserrat_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    },
    textEditInput: {
        color: '#FFF',
        fontFamily:'Montserrat_400Regular',
        fontSize: 13,
        marginLeft:10,
        width: '70%',
        borderColor: '#FFF',
        borderWidth: 2,
        paddingBottom:20,
        paddingTop:20,
        paddingLeft:10,
        borderRadius: 5,
    },

});