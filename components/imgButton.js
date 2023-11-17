import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function ImgButton({ label, onPress, imgName, size }) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        zIndex: 50,
    },
    
});
