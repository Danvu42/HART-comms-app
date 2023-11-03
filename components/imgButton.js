import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function ImgButton({ label, onPress, imgName, size }) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <FontAwesome name={imgName} size={size} color="#FFF"/>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
    },
});
