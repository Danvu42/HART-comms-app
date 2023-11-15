import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useState } from 'react';

export default function TextEditEntry({ label}) {
    const [text, onChangeText] = useState("Placeholder");
return (
    <View style={styles.textEditContainer}>
        <Text style={styles.textEditLabel}>{label}:</Text>
        <TextInput style={styles.textEditInput} 
        onChangeText={onChangeText}
        value={text}
        multiline={false}
        
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
        padding:30,
    },
    textEditLabel: {
        fontFamily:'Montserrat_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    },
    textEditInput: {
        color: '#FFF',
        fontFamily:'Montserrat_400Regular',
        fontSize: 16,
        height:20,
        marginLeft:10,
        borderColor: '#FFF',
        borderWidth: 2,
        paddingBottom:20,
        paddingTop:20,
        paddingLeft:10,
        borderRadius: 5,
    },

});