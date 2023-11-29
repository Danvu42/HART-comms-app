import { StyleSheet, View, Pressable, Text, TextInput, FlatList } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from 'react';

export default function ContentCom({ dataBig, onPress, selectCheckBox }) {
    const initialCheckboxStates = dataBig ? new Array(dataBig.length).fill(false) : [];
    const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);
    console.log(checkboxStates);
    let totalReturn = [];
    if (dataBig) {
        for (let i = 0; i < dataBig.length; i++) {
            let data = dataBig[i];
            totalReturn.push(
                <View style={styles.container} key={i}>
                    <Text style={styles.refNum}>{data.ref_no}</Text>
                    <Pressable style={styles.notes} onPress={() => onPress(i)}>
                        <Text style={{ color: '#000' }}><Text style={{ fontWeight: 'bold' }}>jc_dev_desc:</Text> {data.csc_device_desc}</Text>
                        <Text style={{ color: '#000' }}><Text style={{ fontWeight: 'bold' }}>jc_category:</Text> {data?.jc_categories}</Text>
                        <Text style={{ color: '#000' }}><Text style={{ fontWeight: 'bold' }}>jc_notes:</Text> {data?.jc_notes}</Text>
                        <Text style={{ color: '#000' }}><Text style={{ fontWeight: 'bold' }}>jc_pass:</Text> {data?.jc_pass}</Text>
                        <Text style={{ color: '#000' }}><Text style={{ fontWeight: 'bold' }}>jc_date:</Text> {data?.jc_note_date}</Text>
                        <Text style={{ color: '#000' }}><Text style={{ fontWeight: 'bold' }}>jc_ball_in:</Text> {data?.jc_ball_in_court}</Text>
                    </Pressable>
                    <View style={styles.checkbox}>
                        <BouncyCheckbox
                            style={{ left: 8 }}
                            isChecked={checkboxStates[i]}
                            fillColor="#FFF"
                            iconStyle={{ borderColor: "#000", borderWidth: 3 }}
                            onPress={() => {
                                setCheckboxStates(checkboxStates.map((state, index) => index === i ? !state : state));
                                selectCheckBox(i, checkboxStates[i]);
                            }}
                        />
                    </View>
                </View>
            )
        }
    } else {
        console.log('error has occurred with data');
    }
    return (
        <View>
            {totalReturn}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#0E0E0E',
    },
    refNum: {
        display: 'flex',
        fontSize: 18,
        color: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: '10%',
    },
    notes: {
        backgroundColor: '#FFF',
        borderRadius: 3,
        width: '70%',
        padding: 10,
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
